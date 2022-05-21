import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  BeforeRemove
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated ${this.id}`);
  }

  @BeforeRemove()
  logRemove() {
    console.log(`Removed ${this.id}`);
  }
}
