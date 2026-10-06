import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/matricula.entity.js';
import { MatriculasController } from './matricula.controller.js';
import { MatriculasService } from './matricula.service.js';
import { Student } from '../students/entities/students.entity.js'; 
import { Course } from '../courses/entities/course.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment, Student, Course])],
  controllers: [MatriculasController],
  providers: [MatriculasService],
})
export class MatriculaModule {}
