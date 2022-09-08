import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ type: String }) // this makes property visible to swagger
  @IsEmail({ message: 'email must not be empty' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  @Length(8, 50, { message: 'password must have between 8 and 50 characters' })
  password: string;
}
