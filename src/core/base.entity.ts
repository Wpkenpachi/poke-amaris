import { PrimaryGeneratedColumn, Column } from "typeorm";

export abstract class Base {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'date'
  })
  created_at: Date;
}