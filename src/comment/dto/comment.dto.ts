import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CommentDto {
  @ApiProperty({ example: 'This is a new comment' })
  @IsNotEmpty()
  comment: string;
}
