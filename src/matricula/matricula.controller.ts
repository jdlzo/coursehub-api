import { Body, Controller,Delete, Get, Param, Patch, Post, Query  } from '@nestjs/common';
import {CreateMatriculaDto} from './dto/create-matricula.dto.js';
import { MatriculasService,MatriculaValidationPipe} from './matricula.service.js';

@Controller('matriculas')
export class MatriculasController {

      constructor(private readonly matriculasService: MatriculasService) {}
    
      @Get()
      findAll(@Query('id') ID?: number) {
        return this.matriculasService.findAll(ID);
      }
    
      @Get(':id')
      findOne(@Param('id') id: string) {
        return this.matriculasService.findOne(id);
      }
    
      @Post()
      create(@Body(new MatriculaValidationPipe()) matriculadto: CreateMatriculaDto) {
        return this.matriculasService.create(matriculadto);
      }
    
      @Patch(':id')
      update(
        @Param('id') id: string,
    @Body(new MatriculaValidationPipe()) body: CreateMatriculaDto,
      ) {
        return this.matriculasService.update(id, body);
      }
    
      @Delete(':id')
      remove(@Param('id') id: string) {
        return this.matriculasService.remove(id);
      }
    
}
