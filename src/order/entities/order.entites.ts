import { BaseEntity } from '../../common/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { OrderDetail } from './order-detail.entities';

@Entity('orders')
export class Order extends BaseEntity {
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    eager: false,
  })
  orderDetails: OrderDetail[];

  @Column({ type: 'timestamp' })
  orderDate: Date;

  @Column({ type: 'timestamp' })
  confirmDate: Date;

  @Column({ type: 'uuid' })
  salesId: string;

  @Column({ type: 'uuid' })
  merchantId: string;

  @Column({ type: 'text' })
  notes: Text;

  @Column({ type: 'number' })
  totalQuantity: number;
}
