import { Injectable } from '@nestjs/common';

type Course = {
  id: number;
  title: string;
  level: string;
};
@Injectable()
export class CoursesService {
    private readonly courses: Course[] = [
        { id: 1, title: 'NestJS Fundamentals', level: 'Beginner' },
        { id: 2, title: 'REST APIs with NestJS', level: 'Beginner' },
        { id: 3, title: 'Web Development with Node.js', level: 'Advanced' },
    ];
}
