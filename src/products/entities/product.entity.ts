import { BaseEntity } from "../../common/base.entity";
import { Column, Entity } from "typeorm";


@Entity('product')
export class Product extends BaseEntity  {

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({ type: 'text', nullable: true})
    description: string;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0})
    price: number;

    @Column({ type: 'integer', default: 0})
    stock: number;

    @Column({ type: 'uuid', name: 'updated_by', nullable: true})
    updated_by: string;

}
