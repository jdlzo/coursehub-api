import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/students.entity.js';
import { studentsdto } from './dto/students-dto.js';

@Injectable()
export class StudentsValidationPipe{}

@Injectable()
export class StudentsService {
  remove: any
  constructor(
    @InjectRepository(Student) private readonly studentsRepository: Repository<Student>,) {}
    
  async findAll(ID?: number): Promise<Student[]> {
    if (ID) {
      const student = await this.studentsRepository.findOneBy({ id: ID });
        if (!student) throw new NotFoundException(`Student ${ID} not found`);
        return [student];
    }
    return this.studentsRepository.find();
  }
  async findOne(id: number): Promise<Student> {
    const student = await this.studentsRepository.findOneBy({ id });
    if (!student) throw new NotFoundException(`Student ${id} not found`);
    return student;
  }

  async update(id: number, updateStudentDto: Partial<studentsdto>): Promise<Student> {
  
    await this.findOne(id);

    if (updateStudentDto.email) {
      await this.ensureEmailAvailable(updateStudentDto.email, id);
    }
    const student = await this.studentsRepository.preload({
      id: id,...updateStudentDto,
    });

    if (!student) {
      throw new NotFoundException(`Student ${id} not found`);
    }

    return this.studentsRepository.save(student);
  }

  async create(dto: studentsdto): Promise<Student> {
    await this.ensureEmailAvailable(dto.email);
    return this.studentsRepository.save(this.studentsRepository.create(dto));
  }

  private async ensureEmailAvailable(email: string, currentId?: number) {
    const existing = await this.studentsRepository.findOneBy({ email });
    if (existing && existing.id !== currentId) {
      throw new ConflictException('Email already belongs to another student');
    }
  }
}