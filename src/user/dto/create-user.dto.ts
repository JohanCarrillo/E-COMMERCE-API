import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String }) // this makes property visible to swagger
  @IsEmail({ message: 'email must not be empty' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty({ message: 'name must not be empty' })
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty({ message: 'last name must not be empty' })
  lastname: string;

  @ApiProperty({ type: String })
  @IsString()
  @Length(8, 50, { message: 'password must have between 8 and 50 characters' })
  password: string;
}
