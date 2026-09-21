import { Body, Controller,Delete, Get, Param, Patch, Post, Query  } from '@nestjs/common';
import {CreateMatriculaDto} from './dto/create-matricula.dto.js';
import { MatriculaService, MatriculaValidationPipe } from './matricula.service.js';


@Controller('matricula')
export class MatriculaController {

      constructor(private readonly matriculaService: MatriculaService) {}
    
      @Get()
      findAll(@Query('studentID') studentID?: string) {
        return this.matriculaService.findAll(studentID);
      }
    
      @Get(':id')
      findOne(@Param('id') id: string) {
        return this.matriculaService.findOne(Number(id));
      }
    
      @Post()
      create(@Body(new MatriculaValidationPipe()) createMatriculaDto: CreateMatriculaDto) {
      return this.matriculaService.create(createMatriculaDto);
      }
    
      @Patch(':id')
      update(
        @Param('id') id: string,
        @Body(new MatriculaValidationPipe()) body: { studenID?: string, couseID?:string, isactive?: string },
      ) {
        return this.matriculaService.update(Number(id), body);
      }
    
      @Delete(':id')
      remove(@Param('id') id: string) {
        return this.matriculaService.remove(Number(id));
      }
    
}
