import { Body, Controller,Delete, Get, Param, Patch, Post, Query  } from '@nestjs/common';
import {CreateMatriculaDto} from './dto/create-matricula.dto.js';
import { MatriculasService,MatriculaValidationPipe} from './matricula.service.js';

@Controller('matriculas')
export class MatriculasController {

      constructor(private readonly matriculasService: MatriculasService) {}
    
    @Get()
    findAll(
      @Query('studentId') studentId?: string,
      @Query('courseId') courseId?: string,
    ) {
    
      return this.matriculasService.findAll(
        studentId ? Number(studentId) : undefined,
        courseId ? Number(courseId) : undefined,
      );
    }
    
      @Get(':id')
      findOne(@Param('id') id: number) {
        return this.matriculasService.findOne(id);
      }
    
      @Post()
      create(@Body(new MatriculaValidationPipe()) matriculadto: CreateMatriculaDto) {
        return this.matriculasService.create(matriculadto);
      }
    
      @Patch(':id')
      update(
        @Param('id') id: number,
    @Body(new MatriculaValidationPipe()) body: CreateMatriculaDto,
      ) {
        return this.matriculasService.update(id, body);
      }
    
      @Delete(':id')
      remove(@Param('id') id: number) {
        return this.matriculasService.remove(id);
      }
    
}
