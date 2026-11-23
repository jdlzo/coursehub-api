import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity.js';
import { CoursesController } from './courses.controller.js';
import { CoursesService } from './courses.service.js';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmCourseRepository } from './adapters/typeorm-course.repository.js';
import { COURSE_REPOSITORY } from './ports/course.repository.js';
import { UpdateCourseUseCase } from './use-cases/update-course.use-case.js';
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),TypeOrmModule.forFeature([Course])], // 1
  controllers: [CoursesController],
  providers: [CoursesService,UpdateCourseUseCase,
    {
      provide: COURSE_REPOSITORY,
      useClass: TypeOrmCourseRepository,
    },],
  exports: [CoursesService],
})
export class CoursesModule {}