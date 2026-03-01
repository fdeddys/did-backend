import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity('sales')
export class Sales extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'uuid', nullable: true })
  companyId: string;

  @Column({ type: 'varchar', length: 50 })
  sales_custom_id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  referal_code: string;

  @Column({ type: 'varchar', length: 1, default: 'M' })
  gender: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  photo: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  spv_code: string;

  @Column({ type: 'bool', default: true })
  isActive: boolean;
}
