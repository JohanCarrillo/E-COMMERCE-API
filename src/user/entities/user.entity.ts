import { Product } from 'src/products/entities/product.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRoles } from '../../utils/enums';

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

  @Column({ type: 'simple-array', default: UserRoles.MEMBER })
  roles: UserRoles[];

  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @BeforeUpdate()
  @BeforeInsert()
  sanitizeEmail() {
    this.email = this.email.toLocaleLowerCase().trim();
  }
}
