import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    configService: ConfigService, // injected to use env variables
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: payload.username,
        id: payload.sub,
      },
    });
    if (!user) throw new UnauthorizedException('Unauthorized token');

    if (!user.active) throw new UnauthorizedException('Unauthorized user');

    return user;
  }
}
