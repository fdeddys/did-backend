import { BaseEntity } from "../../common/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Role } from "../../roles/role.entity";

@Entity('users')
export class User extends BaseEntity{

    @Column({ type:'varchar', length: 255, unique: true})
    email: string;

    @Column({ type:'varchar', length: 255})
    name: string;

    @Column({type:'varchar', length: 255})
    password: string;

    @Column({type:'varchar', length: 50, nullable: true})
    phone: string;

    @ManyToOne( ()=> Role, (role) => role.users)
    role: Role;

}
