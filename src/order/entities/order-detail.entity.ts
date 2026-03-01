import { BaseEntity } from '../../common/base.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';
import { Stock } from '../../stock/entities/stock.entity';

@Entity('order-details')
export class OrderDetail extends BaseEntity {
  @OneToMany(() => Order, (order) => order.orderDetails, {
    eager: true,
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ type: 'uuid', name: 'stock_id' })
  stock: Stock;

  @Column({ type: 'integer', default: 0 })
  qtyOrder: number;

  @Column({ type: 'integer', default: 0 })
  qtySent: number;

  @Column({ type: 'integer', default: 0 })
  qtyReceived: number;
}
