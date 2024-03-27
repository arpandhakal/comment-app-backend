import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';
import mongoose, { Model, Types } from 'mongoose';
import { CommentDto } from './dto/comment.dto';
import { User, UserDocument } from 'src/user/schema/user.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly comment: Model<CommentDocument>,
    @InjectModel(User.name) private readonly user: Model<UserDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async createComment(commentDto: CommentDto, commentedBy: string) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const result = await this.comment.create({
        comment: commentDto.comment,
        commentedBy: commentedBy,
      });
      await this.user.updateOne(
        {
          username: commentedBy,
        },
        {
          $push: { comments: result._id },
        },
      );
      await session.commitTransaction();
      return { message: 'Succesfully Commented', data: result };
    } catch (err) {
      await session.abortTransaction();
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    } finally {
      session.endSession();
    }
  }

  async findAll(limit: number) {
    try {
      const result = await this.comment
        .find()
        .sort({ createdAt: +1 })
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

  async findMyComments(userId: string) {
    try {
      const result = await this.user
        .findOne({ _id: new Types.ObjectId(userId) })
        .populate({
          path: 'comments',
          select: '_id comment commentedBy createdAt',
        });

      const comments = result.comments;
      return comments;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
