import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
import Sequelize from './services/sequelizeConnection';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [Sequelize, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
