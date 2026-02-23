import { BaseEntity } from '../../common/base.entity';
import { Banner } from '../../banner/entities/banner.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('company')
export class Company extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;
  @Column({ type: 'varchar', length: 50 })
  code: string;
  @OneToMany(() => Banner, (banner) => banner.company, {
    eager: false,
    cascade: false,
  })
  banner: Banner;
}
