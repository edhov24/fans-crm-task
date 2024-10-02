import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Md5 } from 'ts-md5';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<User> {
    return this.userModel.create({
      ...userData,
      password: Md5.hashStr(userData.password),
    });
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  }

  async loginUser(userData: { email: string; password: string }) {
    return await this.userModel.findOne({
      where: {
        email: userData.email,
        password: Md5.hashStr(userData.password),
      },
      raw: true,
      attributes: { exclude: ['password'] },
    });
  }
}
