import { IsIn, IsNotEmpty, IsString} from 'class-validator'; 

export class CreateCourseDto { 
  @IsString() 
  @IsNotEmpty() 
  name: string;

  @IsString() 
  @IsNotEmpty() 
  age: string;
  
  @IsString() 
  @IsNotEmpty() 
  carrer: string;

  @IsString() 
  @IsNotEmpty() 
  email: string;
  
  @IsString() 
  @IsNotEmpty() 
  isactive: string;
    

  @IsIn(['1','2','3','4','5','6','7','8','9','10']) 
  semester: string;

}