import { IsNotEmpty } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  text: string;
}
