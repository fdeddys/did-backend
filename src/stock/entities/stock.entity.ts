import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Product } from '../../products/entities/product.entity';
import { UOM } from '../../uom/entities/uom.entity';

@Entity('stocks')
export class Stock extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  variant: string;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => UOM, (uom) => uom.id, { eager: true })
  @JoinColumn({ name: 'uom_id' })
  uom: UOM;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'integer' })
  stock: number;
}
