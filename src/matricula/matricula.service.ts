import { Injectable,ConflictException,PipeTransform,ArgumentMetadata } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto.js';
type matricula ={
        id: number;
        studentID: string;
        courseID: string;
        isactive?: string;
};
type CreateMatriculaInput = {
        studentID: string;
        courseID: string;
        isactive?: string;
};
type UpdateMatriculaInput = {
        studentID?: string;
        courseID?: string;
        isactive?: string;
};
@Injectable()
export class MatriculaValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (value.studentID) {
            value.studentID = value.studentID.toLowerCase();
        }
        return value;   
    }
}

@Injectable()
export class MatriculaService {
    private nextId = 4;
    private matricula: matricula[] = [
    { id: 1, studentID: '1', courseID: '1', isactive: 'Activo'},
    { id: 2, studentID: '2', courseID: '2', isactive: 'Activo'},
    { id: 3, studentID: '3', courseID: '3', isactive: 'Inactivo'},
  ];
findAll(studentID?: string): matricula[] {
    if (!studentID) {
      return this.matricula;
    }

    return this.matricula.filter((matricula) => matricula.studentID === studentID);
  }


  findOne(id: number): matricula | undefined {
    return this.matricula.find((matricula) => matricula.id === id);
  }

  create(createMatriculaDto: CreateMatriculaDto): matricula {
    const emailExists = this.matricula.some(matricula => matricula.studentID === createMatriculaDto.studentID);
    if (emailExists) {
      throw new ConflictException('El ID del estudiante ya esta en uso....');
    }
    const matricula = { id: this.nextId++, ...createMatriculaDto };
    this.matricula.push(matricula);
    return matricula;
  }

  update(id: number, input: UpdateMatriculaInput): matricula | undefined {
    const matricula = this.findOne(id);


    if (!matricula) {
      return undefined;
    }

    Object.assign(matricula, input);
    return matricula;
  }

  remove(id: number): matricula | undefined {
    const index = this.matricula.findIndex((matricula) => matricula.id === id);
    if (this.matricula[index].isactive === 'Inactivo') {
      throw new ConflictException('No puedes eliminar a un estudiante inacivo');
    }

    if (index === -1) {
      return undefined;
    }

    const [removedMatricula] = this.matricula.splice(index, 1);
    return removedMatricula;
  }
}
