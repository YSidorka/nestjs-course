import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
  OneToMany
} from 'typeorm';
import { ReportEntity } from '../reports/report.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => ReportEntity, (report) => report.user)
  reports: ReportEntity[];

  @AfterInsert()
  logInsert() {
    //console.log(`Inserted id:`, this.id);
  }

  @AfterUpdate()
  logUpdate() {
    //console.log(`Updated id:`, this.id);
  }

  @BeforeRemove()
  logRemove() {
    //console.log(`Removed id:`, this.id);
  }
}
