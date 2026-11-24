import { Test } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { UpdateCourseUseCase } from './update-course.use-case.js';
import { COURSE_REPOSITORY } from '../ports/course.repository.js';
import { vi } from 'vitest';
import { UserRole } from '../../users/user-role.enum.js';
import { Course } from '../entities/course.entity.js';

describe('UpdateCourseUseCase', () => {
  let useCase: UpdateCourseUseCase;

  const courses = {
    findById: vi.fn(),
    save: vi.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateCourseUseCase,
        { provide: COURSE_REPOSITORY, useValue: courses },
      ],
    }).compile();

    useCase = module.get(UpdateCourseUseCase);
    vi.clearAllMocks();
  });

  it('allows the owner teacher to update a course', async () => {
    const course = { id: 7, title: 'NestJS', createdByUserId: 4 } as Course;
    courses.findById.mockResolvedValue(course);
    courses.save.mockImplementation(async (value: any) => value);

    const result = await useCase.execute(
      7,
      { title: 'NestJS avanzado' } as any,
      { id: 4, role: UserRole.TEACHER } as any,
    );

    expect(result.title).toBe('NestJS avanzado');
    expect(courses.save).toHaveBeenCalledWith(course);
  });

  it('rejects an update from a different teacher', async () => {
    courses.findById.mockResolvedValue({ id: 7, createdByUserId: 4 });

    await expect(
      useCase.execute(
        7,
        { title: 'Cambio' } as any,
        { id: 9, role: UserRole.TEACHER } as any,
      ),
    ).rejects.toThrow(ForbiddenException);

    expect(courses.save).not.toHaveBeenCalled();
  });
});