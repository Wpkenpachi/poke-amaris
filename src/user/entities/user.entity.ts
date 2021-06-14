import { Entity, Column } from "typeorm";
import { Base } from '../../core/base.entity';

@Entity()
export class User extends Base {
  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: number;
}