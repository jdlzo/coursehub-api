import { IsString, IsNotEmpty,IsInt } from 'class-validator';

export class studentsdto {
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsInt()
  age: number;

  @IsNotEmpty()
  @IsString()
  career: string;

  @IsNotEmpty()
  @IsInt()
  semester: number;

  @IsNotEmpty()
  isActive: boolean;
}