import { BaseEntity } from "../../common/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { UtilDtl } from "./util-dtl.entities";


@Entity('util_hdr')
export class UtilHdr extends BaseEntity {

    @Column({ unique : true} )
    name: string;

    @OneToMany(()=> UtilDtl, (dtl) => dtl.hdr)
    details: UtilDtl[];
}