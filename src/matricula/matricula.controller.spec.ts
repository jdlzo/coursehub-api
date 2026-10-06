import { Test, TestingModule } from '@nestjs/testing';
import { MatriculasController } from './matricula.controller.js';

describe('MatriculaController', () => {
  let controller: MatriculasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatriculasController],
    }).compile();

    controller = module.get<MatriculasController>(MatriculasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
