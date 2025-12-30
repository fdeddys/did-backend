import { BaseEntity } from "../../common/base.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import * as bcrypt from 'bcrypt';

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

    @Column({type:'varchar', length: 20, default:'user'})
    role: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    async comparePassword(attemp: string): Promise<boolean>{
        return await bcrypt.compare(attemp, this.password);
    }

}
