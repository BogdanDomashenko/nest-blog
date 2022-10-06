import type { User } from '@prisma/client';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';
import { AccessToken } from 'src/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto): Promise<User> {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SigninDto): Promise<AccessToken> {
    return this.authService.signin(dto);
  }
}
