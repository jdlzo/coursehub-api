import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoursesService, CourseValidationPipe } from './courses.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll(@Query('name') name?: string) {
    return this.coursesService.findAll(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(Number(id));
  }

  @Post()
  create(@Body(new CourseValidationPipe()) createCourseDto: CreateCourseDto) {
  return this.coursesService.create(createCourseDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new CourseValidationPipe()) body: { name?: string; email?: string; age?: string; carrer?: string; semester?: string; isactive?: string },
  ) {
    return this.coursesService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(Number(id));
  }
}