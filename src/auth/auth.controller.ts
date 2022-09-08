import {
  Controller,
  // Get,
  Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// import { CreateUserDto } from 'src/user/dto/create-user.dto';
// import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
// import { LoginAuthDto } from './dto/login-auth.dto';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
// import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // AuthGuard declares that this is our login route using the local-strategy
  @Post('login')
  async loginUser(@Request() req) {
    // console.log(req.user);
    return this.authService.loginUser(req.user);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
