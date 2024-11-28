import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Version } from './version.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @OneToMany(() => Version, (version) => version.service)
  versions!: Version[];
}
