import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    try {
      registerUserDto.password = await bcrypt.hash(
        registerUserDto.password,
        12,
      );
      await this.userModel.create(registerUserDto);
      return { message: 'User created succesfully' };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginDto: LoginDto): Promise<any> {
    try {
      const user = await this.userModel.findOne({
        email: loginDto.email,
      });
      if (user) {
        const isPasswordMatch = await bcrypt.compare(
          loginDto.password,
          user.password,
        );
        if (isPasswordMatch) {
          const payload = {
            username: user.username,
            id: user._id,
          };
          const response = await this.jwtService.signAsync(payload);
          return {
            username: user.username,
            email: user.email,
            access_token: response,
          };
        } else {
          throw new HttpException(
            'Invalid Credentials',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        throw new HttpException(
          'Invalid Credentials, user not found',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    }
  }
}
