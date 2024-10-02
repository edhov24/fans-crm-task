import { SequelizeModule } from '@nestjs/sequelize';
import User from '../users/user.model';

const { DB_HOST, DB_NAME, DB_PORT, DB_PASSWORD, DB_USERNAME } = process.env;

const Sequelize = SequelizeModule.forRoot({
  dialect: 'mysql',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  models: [User],
  autoLoadModels: true,
  synchronize: true,
  logging: false,
});

export default Sequelize;
