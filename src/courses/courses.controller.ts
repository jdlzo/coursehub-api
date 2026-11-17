import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CoursesService, CourseValidationPipe } from './courses.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { CoursesQueryDto } from './dto/courses-query.dto.js';
import { JwtAuthGuard, Roles } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles-guard.js';
import { UserRole } from '../users/user-role.enum.js';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  /*@Get()
  findAll(@Query('id') id?: string) {
    return this.coursesService.findAll(id);
  }*/
  @Get()
  findAll(@Query() query: CoursesQueryDto) {
    return this.coursesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coursesService.findOne(id);
  }

  @Post()
  create(@Body(new CourseValidationPipe()) createCourseDto: CreateCourseDto) {
  return this.coursesService.create(createCourseDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body(new CourseValidationPipe()) body: CreateCourseDto,
  ) {
    return this.coursesService.update(id, body);
  }

  /*@Delete(':id')
  remove(@Param('id') id: number) {
    return this.coursesService.remove(id);
  }*/
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }
}