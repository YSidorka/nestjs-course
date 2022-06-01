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
    console.log(`Inserted id:`, this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated id:`, this.id);
  }

  @BeforeRemove()
  logRemove() {
    console.log(`Removed id:`, this.id);
  }
}
