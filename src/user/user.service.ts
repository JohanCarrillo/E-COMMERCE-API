import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger('UserService');

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.userRepository.save(user);
      delete user.password;
      const payload = { username: user.email, sub: user.id };
      return {
        ...user,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error.code === '23505')
        // if email is in use
        throw new HttpException(
          'User is already exist',
          HttpStatus.BAD_REQUEST,
        );
      this.logger.error(error); // this is shown in console
      throw new HttpException( // this is sent to the client
        'Failed to save User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new HttpException(
        'Error finding all users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    return user;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
