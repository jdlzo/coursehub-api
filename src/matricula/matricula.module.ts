import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/matricula.entity.js';
import { MatriculasController } from './matricula.controller.js';
import { MatriculasService } from './matricula.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment])],
  controllers: [MatriculasController],
  providers: [MatriculasService],
})
export class MatriculaModule {}
