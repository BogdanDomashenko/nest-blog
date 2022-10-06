import * as argon from 'argon2';
import type { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto, SigninDto } from './dto';
import { AccessToken } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signup(dto: SignupDto): Promise<User> {
    const hash = await argon.hash(dto.password);

    try {
      const user: User = await this.prisma.user.create({
        data: { email: dto.email, username: dto.username, hash },
      });

      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
        throw error;
      }
    }
  }

  async signin(dto: SigninDto): Promise<AccessToken> {
    const user: User = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (!user) throw new ForbiddenException('Credentials incorrect');

    const passwordMatches: boolean = await argon.verify(
      user.hash as string,
      dto.password,
    );

    if (!passwordMatches) throw new ForbiddenException('Credentials incorrect');

    const token: AccessToken = await this.signToken(
      user.id,
      user.email,
      user.username,
    );

    return token;
  }

  async signToken(
    id: number,
    email: string,
    username: string,
  ): Promise<AccessToken> {
    const payload = {
      sub: id,
      email,
      username,
    };

    const access_token: string = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return { access_token };
  }
}
