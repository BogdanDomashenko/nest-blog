import { IsNumber } from 'class-validator';

export class DeletePostDto {
  @IsNumber()
  id: number;
}
