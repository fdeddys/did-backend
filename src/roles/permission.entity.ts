import { BaseEntity } from "../common/base.entity";
import { Column, Entity, ManyToMany } from "typeorm";
import { Role } from "./role.entity";

@Entity('permissions')
export class Permission extends BaseEntity {

    // nama permision mis : Approve invoice
    @Column({unique: true})
    name: string;

    // invoice.approve
    @Column({unique: true})
    slug: string;

    // module nya : invoice
    @Column()
    module: string;

    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[];
    
    
}