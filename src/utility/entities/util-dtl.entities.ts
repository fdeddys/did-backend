import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { UtilHdr } from "./util-hdr.entities";

@Entity('util_dtl')
export class UtilDtl extends BaseEntity {

    @Column()
    name: string;


    @ManyToOne(()=> UtilHdr, (hdr)=>hdr.details)
    @JoinColumn({name: 'hdr_id'})
    hdr : UtilHdr;

}