import { IsString, IsNotEmpty,IsInt, IsBoolean } from 'class-validator';

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
  @IsBoolean()
  isActive: boolean;
}