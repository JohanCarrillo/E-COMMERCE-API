import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
// import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  private readonly logger = new Logger('AuthService');

  async validateUser(loginUser: LoginAuthDto): Promise<User> {
    try {
      const user = await this.userService.findUserByEmail(loginUser.email);
      if (!user) {
        // no user
        throw new HttpException('Unable to find user', HttpStatus.NOT_FOUND);
      } else if (!bcrypt.compareSync(loginUser.password, user.password)) {
        // wrong password
        throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
      } else {
        // login successful
        // delete user.password;
        return user;
      }
    } catch (error) {
      this.logger.error(error); // this is shown in console
      throw new HttpException( // this is sent to the client
        'Failed to validate User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginUser(user: User) {
    const payload: IJwtPayload = { username: user.email, sub: user.id };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
