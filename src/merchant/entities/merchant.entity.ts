import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity('merchants')
export class Merchant extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'date' })
  joinDate: Date;

  @Column({ type: 'varchar', length: 100 })
  pic_name: string;

  @Column({ type: 'varchar', length: 100 })
  pic_contact: string;

  @Column({ type: 'varchar', length: 100 })
  coordinate: string;

  @Column({ type: 'date', default: null })
  date_approval: Date;

  @Column({ type: 'bool', default: true })
  isActive: boolean;
}
