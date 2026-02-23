import { BaseEntity } from '../../common/base.entity';
import { Company } from '../../company/entities/company.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('banner')
export class Banner extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  title: string;
  @Column({ type: 'varchar', length: 255 })
  image_url: string;
  @Column({ type: 'varchar', length: 255 })
  description: string;
  @Column({ type: 'date' })
  start_date: Date;
  @Column({ type: 'date' })
  end_date: Date;
  @Column({ type: 'varchar' })
  position: string;
  @Column({ type: 'bool', default: true })
  is_shown: boolean;
  @Column({ type: 'bool', default: true })
  is_announcement: boolean;
  @ManyToOne(() => Company, (company) => company.id, {
    cascade: false,
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
