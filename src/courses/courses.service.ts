import { Injectable,ConflictException,PipeTransform,ArgumentMetadata} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto.js';

type Course = {
  id: number;
  name: string;
  email: string;
  age: string;
  carrer: string;
  semester: string;
  isactive: string;
};

type CreateCourseInput = {
  name: string;
  email: string;
  age: string;
  carrer: string;
  semester: string;
  isactive: string;
};

type UpdateCourseInput = {
  name?: string;
  email?: string;
  age?: string;
  carrer?: string;
  semester?: string;
  isactive?: string;
};

//solo hace que el nombre se convierta en minuscula
@Injectable()
export class CourseValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.name) {
      value.name = value.name.toLowerCase();
    }
    return value;
  }
}

@Injectable()
export class CoursesService {
  private nextId = 4;
  private courses: Course[] = [
    { id: 1, name: 'Jordan', email: 'AA@hotmail.com', age:'19',carrer:'Software',semester:'5',isactive:'Activo'},
    { id: 2, name: 'Pepe', email: 'BBB@hotmail.com',age:'20',carrer:'Software',semester:'5',isactive:'Inactivo' },
    { id: 3, name: 'Juan', email: 'AAA@hotmail.com',age:'45',carrer:'Software',semester:'5',isactive:'Activo' },
  ];


  findAll(name?: string): Course[] {
    if (!name) {
      return this.courses;
    }

    return this.courses.filter((course) => course.name === name);
  }


  findOne(id: number): Course | undefined {
    return this.courses.find((course) => course.id === id);
  }

  create(createCourseDto: CreateCourseDto): Course {
    const emailExists = this.courses.some(course => course.email === createCourseDto.email);
    if (emailExists) {
      throw new ConflictException('El correo ingresado ya esta en uso....');
    }
    const course = { id: this.nextId++, ...createCourseDto };
    this.courses.push(course);
    return course;
  }

  update(id: number, input: UpdateCourseInput): Course | undefined {
    const course = this.findOne(id);


    if (!course) {
      return undefined;
    }

    Object.assign(course, input);
    return course;
  }
  
  remove(id: number): Course | undefined {
    const index = this.courses.findIndex((course) => course.id === id);
    if (this.courses[index].isactive === 'Inactivo') {
      throw new ConflictException('No puedes eliminar a un estudiante inacivo');
    }

    if (index === -1) {
      return undefined;
    }

    const [removedCourse] = this.courses.splice(index, 1);
    return removedCourse;
  }
}