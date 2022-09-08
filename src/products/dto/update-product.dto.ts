import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'title must not be empty' })
  title: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  @Length(0, 100)
  description: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'size must not be empty' })
  size: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'stock must not be empty' })
  genre: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty({ message: 'price must not be empty' })
  @IsNumberString()
  price: string;

  @ApiProperty({ type: Number })
  @IsOptional()
  @IsInt()
  stock: number;
}
