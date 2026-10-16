import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsNotEmpty, IsString, IsOptional,IsBooleanString,Min,Max} from 'class-validator'; 

export class CreateMatriculaDto { 
  @IsInt() 
  @IsNotEmpty()
  studentID: number;

  @IsInt() 
  @IsNotEmpty() 
  courseID: number;


}

export class EnrollmentsQueryDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) studentId?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) courseId?: number;
  @IsOptional() @IsBooleanString() activeOnly?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(50) limit = 10;
}