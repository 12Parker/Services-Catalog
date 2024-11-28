import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Service } from './service.entity';

@Entity()
@Unique(['versionNumber', 'service'])
export class Version {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  versionNumber!: string;

  @ManyToOne(() => Service, (service) => service.versions)
  service!: Service;
}
