import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum sizesEnum {
  XXS = 'XXS',
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('text')
  size: string;

  @Column('text')
  genre: string;

  @Column('text')
  price: string;

  @Column({ type: 'integer', default: 0 })
  stock: number;

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;
}
