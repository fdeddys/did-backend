import { BaseEntity } from "../../common/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { UtilDtl } from "../../utility/entities/util-dtl.entities";


@Entity("product_items")
export class ProductItem extends BaseEntity {

    @ManyToOne(()=>Product, (p)=>p.id )
    @JoinColumn({name: 'product_id'})
    product: Product;

    @ManyToOne(() =>UtilDtl, { nullable : true})
    @JoinColumn({name: 'variant_id'})
    variant: UtilDtl;

    @ManyToOne(()=> UtilDtl, {nullable : true})
    @JoinColumn({name: 'uom_id'})
    uom: UtilDtl;

    @Column({ type: 'number'})
    price: number;

    @Column({ type: 'number'})
    stock: number;

}