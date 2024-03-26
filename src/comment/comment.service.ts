import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';
import { Model } from 'mongoose';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly comment: Model<CommentDocument>,
  ) {}

  async createComment(commentDto: CommentDto, commentedBy: string) {
    try {
      const result = await this.comment.create({
        comment: commentDto.comment,
        commentedBy: commentedBy,
      });
      return { message: 'Succesfully Commented', data: result };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(limit: number) {
    try {
      const result = await this.comment
        .find()
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .exec();

      const count = await this.comment.countDocuments();
      return {
        totalData: count,
        data: result,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
