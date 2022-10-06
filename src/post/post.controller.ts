import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import type { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('post')
export class PostController {
  constructor() {}

  @UseGuards(JwtGuard)
  @Get('list')
  async list(@GetUser() user: User) {
    return user;
  }
}
