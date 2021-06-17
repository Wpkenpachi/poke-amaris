import { PrimaryGeneratedColumn, Column } from "typeorm";

export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'timestamp',
    default: new Date()
  })
  created_at: string;
}