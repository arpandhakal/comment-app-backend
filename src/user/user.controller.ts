import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
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
  createComment(@Body() commentDto: CommentDto, @Request() request: any) {
    console.log(request);
    return this.commentService.createComment(commentDto, request.user.username);
  }

  @Get('/comment')
  @ApiQuery({
    name: 'limit',
    required: true,
  })
  getAllComments(@Query('limit') limit: number) {
    return this.commentService.findAll(limit);
  }

  @Get('/my-comment')
  getMyComments(@Request() request: any) {
    return this.commentService.findMyComments(request.user.id);
  }
}
