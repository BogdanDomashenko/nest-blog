import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Post, User } from '@prisma/client';
import { PostDto } from './dto/post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { role } from 'src/shared/constants';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async list(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async create(dto: PostDto, user: User): Promise<Post> {
    const post: Post = await this.prisma.post.create({
      data: { title: dto.text, text: dto.text, authorId: user.id },
    });

    return post;
  }

  async delete(dto: DeletePostDto, user: User): Promise<void> {
    const post = await this.prisma.post.findUnique({ where: { id: dto.id } });

    if (!post) {
      throw new BadRequestException('This post does not exists');
    }

    if (post.authorId !== user.id && user.role !== role.admin) {
      throw new ForbiddenException('Access dined');
    }
  }
}
