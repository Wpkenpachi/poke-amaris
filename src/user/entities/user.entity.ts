import { Entity, Column } from "typeorm";
import { Base } from '../../core/base.entity';

@Entity()
export class User extends Base {
  @Column({
    unique: true
  })
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;
}