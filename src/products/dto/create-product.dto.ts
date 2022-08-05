import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'title must not be empty' })
  title: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  description: string;

  @IsNotEmpty({ message: 'size must not be empty' })
  size: string;

  @IsString()
  @IsNotEmpty({ message: 'stock must not be empty' })
  genre: string;

  @IsNotEmpty({ message: 'price must not be empty' })
  @IsNumberString()
  price: string;

  @IsInt()
  stock: number;
}
