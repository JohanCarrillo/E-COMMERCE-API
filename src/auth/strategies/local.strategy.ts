import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
// import { ILocalStrtegyPayload } from '../interfaces/local-strategy.interface';
// import { LoginAuthDto } from './dto/login-auth.dto';

// this is the class that stick user object to Request
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<any> {
    // console.log('payload', email, password);
    const user = await this.authService.validateUser({
      email: email,
      password: password,
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
