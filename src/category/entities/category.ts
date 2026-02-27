import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'bool', default: true })
  isArchieve: boolean;

  @OneToMany(() => Product, (product) => product.category, {
    cascade: false,
    eager: false,
  })
  products: Product[];
}
