import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  COURSE_REPOSITORY,
  type CourseRepository,
} from '../ports/course.repository.js'; 
import { CoursesQueryDto } from '../dto/courses-query.dto.js'; 
import { AuthenticatedUser } from '../../auth/types/jwt-payload.type.js';
import { UserRole } from '../../users/user-role.enum.js'; 

@Injectable()
export class UpdateCourseUseCase {
  constructor(
    @Inject(COURSE_REPOSITORY) private readonly courses: CourseRepository,
  ) {}

  async execute(id: number, changes: CoursesQueryDto, actor: AuthenticatedUser) {
    const course = await this.courses.findById(id);
    if (!course) throw new NotFoundException('Course not found');
    if (actor.role !== UserRole.ADMIN && course.createdByUserId !== actor.id) {
      throw new ForbiddenException('You cannot modify this course');
    }
    Object.assign(course, changes);
    return this.courses.save(course);
  }
}