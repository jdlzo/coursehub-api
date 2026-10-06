import { Injectable, PipeTransform, ArgumentMetadata, NotFoundException,BadRequestException, ConflictException} from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './entities/matricula.entity.js';
import { Student } from '../students/entities/students.entity.js'; 
import { Course } from '../courses/entities/course.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class MatriculaValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.title) {
      value.title = value.title.toLowerCase();
    }
    return value;
  }
}

@Injectable()
export class MatriculasService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly matriculasRepository: Repository<Enrollment>,
    
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  async findAll(studentId?: number, courseId?: number): Promise<Enrollment[]> {
    const condicionesWhere: any = {};
    if (studentId) {
      condicionesWhere.student = { id: studentId };
    }
    if (courseId) {
      condicionesWhere.course = { id: courseId };
    }

    return this.matriculasRepository.find({
      where: condicionesWhere,
      relations: {
        student: true,
        course: true,
      },
    });
  }

  async findOne(id: number): Promise<Enrollment> {
    const matricula = await this.matriculasRepository.findOneBy({ id: Number(id) });
    if (!matricula) throw new NotFoundException(`Matricula ${id} not found`);
    return matricula;
  }

  async create(dto: CreateMatriculaDto): Promise<Enrollment> {
    const student = await this.studentsRepository.findOneBy({ id: Number(dto.studentID) });
    if (!student) throw new NotFoundException(`Student ${dto.studentID} not found`);
    if (!student.isActive) throw new BadRequestException('Inactive students cannot enroll');
    const course = await this.coursesRepository.findOneBy({ id: Number(dto.courseID) });
    if (!course) throw new NotFoundException(`Course ${dto.courseID} not found`);
    const duplicate = await this.matriculasRepository.findOne({
      where: { student: { id: student.id }, course: { id: course.id } },
    });
    if (duplicate) throw new ConflictException('Student is already enrolled in this course');
    return this.matriculasRepository.save(
      this.matriculasRepository.create({ student, course }),
    );
  }

  async update(id: number, dto: CreateMatriculaDto) {
    const matricula = await this.findOne(id);
    Object.assign(matricula, dto);
    return this.matriculasRepository.save(matricula);
  }

  async remove(id: number) {
    const matricula = await this.findOne(id);
    await this.matriculasRepository.remove(matricula);
    return matricula;
  }
}