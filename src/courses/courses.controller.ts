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
  findAll(@Query('id') id?: string) {
    return this.coursesService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post()
  create(@Body(new CourseValidationPipe()) createCourseDto: CreateCourseDto) {
  return this.coursesService.create(createCourseDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new CourseValidationPipe()) body: CreateCourseDto,
  ) {
    return this.coursesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}