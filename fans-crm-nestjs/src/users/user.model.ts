import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column
  password: string;
}

export default User;
