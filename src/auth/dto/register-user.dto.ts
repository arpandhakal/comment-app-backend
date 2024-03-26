import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class RegisterUserDto {
  @ApiProperty({ example: 'arpan_red' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'arpandhakal20@gmail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'nepal123' })
  @IsNotEmpty()
  password: string;
}
