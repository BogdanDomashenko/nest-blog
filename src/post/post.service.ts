import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Post } from '@prisma/client';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  /* 
  async list(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async create(dto: PostDto): Promise<Post> {
    const post: Post = await this.prisma.post.create({
      data: { title: dto.text, text: dto.text, authorId: 1 },
    });

    return post;
  } */
}
