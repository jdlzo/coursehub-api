import { Body, Controller,Delete, Get, Param, Patch, Post, Query  } from '@nestjs/common';
import {studentsdto} from './dto/students-dto.js';
import { StudentsService, StudentsValidationPipe} from './students.service.js';

@Controller('students')
export class StudentsController {

      constructor(private readonly studentsService: StudentsService) {}
    
      @Get()
      findAll(@Query('id') ID?: number) {
        return this.studentsService.findAll(ID);
      }
    
      @Get(':id')
      findOne(@Param('id') id: string) {
        return this.studentsService.findOne(Number(id));
      }
    
      @Post()
      create(@Body(new StudentsValidationPipe()) studentsdto: studentsdto) {
        return this.studentsService.create(studentsdto);
      }
    
      @Patch(':id')
      update(
        @Param('id') id: number,
    @Body(new StudentsValidationPipe()) body: studentsdto,
      ) {
        return this.studentsService.update(Number(id), body);
      }
    
      @Delete(':id')
      remove(@Param('id') id: number) {
        return this.studentsService.remove(Number(id));
      }
    
}
