import { Injectable,ConflictException,PipeTransform,ArgumentMetadata, NotFoundException} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity.js';
import { DeepPartial, Repository } from 'typeorm';


//solo hace que el nombre se convierta en minuscula
@Injectable()
export class CourseValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.title) {
      value.title = value.title.toLowerCase();
    }
    return value;
  }
}

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {} // 1

  findAll(level?: string) { // 2
    return this.coursesRepository.find({ where: level ? { level } : {} }); // 3
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.coursesRepository.findOneBy({ id: Number(id) }); // 4
    if (!course) throw new NotFoundException(`Course ${id} not found`); // 5
    return course;
  }

  async create(dto: CreateCourseDto): Promise<Course> {
    const course = this.coursesRepository.create(dto as DeepPartial<Course>);
    return this.coursesRepository.save(course);
  }

  async update(id: string, dto: CreateCourseDto) {
    const course = await this.findOne(id); // 7
    Object.assign(course, dto);
    return this.coursesRepository.save(course); // 8
  }

  async remove(id: string) {
    const course = await this.findOne(id); // 9
    await this.coursesRepository.remove(course); // 10
    return course;
  }
}