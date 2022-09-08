import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty({ message: 'title must not be empty' })
  title: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  description: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'size must not be empty' })
  size: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty({ message: 'stock must not be empty' })
  genre: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'price must not be empty' })
  @IsNumberString()
  price: string;

  @ApiProperty({ type: Number })
  @IsInt()
  stock: number;
}
