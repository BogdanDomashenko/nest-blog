import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import type { User } from '@prisma/client';
import { GetUser, Roles } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { role } from 'src/shared/constants';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('list')
  async list() {
    return this.postService.list();
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(role.admin)
  @Post('create')
  async create(@Body() dto: PostDto, @GetUser() user: User) {
    return this.postService.create(dto, user);
  }
}
