import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column('varchar', { length: 250 })
  name: string;

  @Column('varchar', { length: 250 })
  lastname: string;

  @Column('varchar', { length: 60 })
  password: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'simple-array', default: 'user' })
  roles: string[];

  @BeforeUpdate()
  @BeforeInsert()
  sanitizeEmail() {
    this.email = this.email.toLocaleLowerCase().trim();
  }
}
