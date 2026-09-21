import { IsIn, IsNotEmpty, IsString,} from 'class-validator'; 

export class CreateMatriculaDto { 
  @IsString() 
  @IsNotEmpty()
  studentID: string;

  @IsString() 
  @IsNotEmpty() 
  @IsIn(['1','2','3','4','5','6','7','8','9','10'])
  courseID: string;
    
    @IsString() 
  @IsNotEmpty() 
  isactive: string;


}