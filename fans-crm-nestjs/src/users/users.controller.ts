import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { sign } from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

@Controller('api/v1')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add-user')
  async addUser(
    @Body()
    userData: {
      name: string;
      email: string;
      phone: string;
      password: string;
    },
  ) {
    const createdUser = await this.usersService.createUser(userData);
    return await this.usersService.getUserById(createdUser.id);
  }

  @Post('login-user')
  async loginUser(@Body() userData: { email: string; password: string }) {
    const user = await this.usersService.loginUser(userData);
    if (!user) {
      throw new ForbiddenException('Wrong email or password');
    }
    const token = sign({ id: user.id }, JWT_SECRET);
    return { ...user, token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-user/:id')
  async getUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
}
