import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop()
  comment: string;

  @Prop()
  commentedBy: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
