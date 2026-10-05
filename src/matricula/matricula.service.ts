import { Injectable, PipeTransform, ArgumentMetadata, NotFoundException } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './entities/matricula.entity.js';
import { DeepPartial, Repository } from 'typeorm';

// solo hace que el nombre se convierta en minúscula
@Injectable()
export class MatriculaValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.title) {
      value.title = value.title.toLowerCase();
    }
    return value;
  }
}

@Injectable()
export class MatriculasService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly matriculasRepository: Repository<Enrollment>,
  ) {}

  findAll(ID: number | undefined) {
    return this.matriculasRepository.find();
  }

  async findOne(id: string): Promise<Enrollment> {
    const matricula = await this.matriculasRepository.findOneBy({ id: Number(id) });
    if (!matricula) throw new NotFoundException(`Matricula ${id} not found`);
    return matricula;
  }

  async create(dto: CreateMatriculaDto): Promise<Enrollment> {
    const matricula = this.matriculasRepository.create(dto as DeepPartial<Enrollment>);
    return this.matriculasRepository.save(matricula);
  }

  async update(id: string, dto: CreateMatriculaDto) {
    const matricula = await this.findOne(id);
    Object.assign(matricula, dto);
    return this.matriculasRepository.save(matricula);
  }

  async remove(id: string) {
    const matricula = await this.findOne(id);
    await this.matriculasRepository.remove(matricula);
    return matricula;
  }
}