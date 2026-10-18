import { IsIn, IsInt, IsNotEmpty, IsString} from 'class-validator'; 

export class CreateCourseDto { 
  
  @IsString()
  @IsNotEmpty()
  title: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['beginner', 'intermediate', 'advanced'])
  level: string;

  

}