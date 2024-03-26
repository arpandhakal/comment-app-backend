import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CommentService } from 'src/comment/comment.service';
import { CommentDto } from 'src/comment/dto/comment.dto';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/comment')
  register(@Body() commentDto: CommentDto, @Request() request: any) {
    console.log(request);
    return this.commentService.createComment(commentDto, request.user.username);
  }
}
