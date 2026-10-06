import { IsBoolean, IsIn, IsInt, IsNotEmpty, IsString} from 'class-validator'; 

export class CreateMatriculaDto { 
  @IsInt() 
  @IsNotEmpty()
  studentID: number;

  @IsInt() 
  @IsNotEmpty() 
  @IsIn([1,2,3,4,5,6,7,8,9,10])
  courseID: number;


}