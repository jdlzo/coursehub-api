import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller.js';
import { UpdateCourseUseCase } from './use-cases/update-course.use-case.js';
import { UserRole } from '../users/user-role.enum.js';


describe('CoursesController', () => {
  let controller: CoursesController;
const updateCourse = { execute: vi.fn() };

beforeEach(async () => {
  const module = await Test.createTestingModule({
    controllers: [CoursesController],
    providers: [{ provide: UpdateCourseUseCase, useValue: updateCourse }],
  }).compile();
  controller = module.get(CoursesController);
  vi.clearAllMocks();
});

it('delegates update with the id body and authenticated user', async () => {
  const actor = { id: 4, role: UserRole.TEACHER } as any;
  const dto = { title: 'NestJS avanzado', level: 'beginner' } as any;
  updateCourse.execute.mockResolvedValue({ id: 7, ...dto });

  await expect(controller.update
    (7, dto, actor)).resolves.toEqual({ id: 7, ...dto });
  expect(updateCourse.execute).toHaveBeenCalledWith(7, dto, actor);
});
});