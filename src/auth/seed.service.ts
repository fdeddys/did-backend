import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "../permission/entities/permission.entity";
import { Role } from "../roles/role.entity";
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';


@Injectable()
export class SeedService {

    constructor(
        @InjectRepository(Role) private roleRepo: Repository<Role>,
        @InjectRepository(Permission) private permissionRepo: Repository<Permission>,
        @InjectRepository(User) private userRepo: Repository<User>
    ){}

    async runSeed() {
        const p1 = await this.permissionRepo.save({
            name: 'Create User',
            slug: 'user.create',
            module: 'User',
        });

        const p2 = await this.permissionRepo.save({
            name: 'View User',
            slug: 'user.view',
            module: 'User',
        });

        const p3 = await this.permissionRepo.save({
            name: 'Edit User',
            slug: 'user.update',
            module: 'User',
        });

        const p4 = await this.permissionRepo.save({
            name: 'Delete User',
            slug: 'user.delete',
            module: 'User',
        });

        const p5 = await this.permissionRepo.save({
            name: 'Approve Invoice',
            slug: 'invoice.approve',
            module: 'Finance',
        });

        const p6 = await this.permissionRepo.save({
            name: 'Role',
            slug: 'role.create',
            module: 'Role',
        });

        const p7 = await this.permissionRepo.save({
            name: 'View Role',
            slug: 'role.view',
            module: 'Role',
        });

        const p8 = await this.permissionRepo.save({
            name: 'Update Role',
            slug: 'role.update',
            module: 'Role',
        });

        const p9 = await this.permissionRepo.save({
            name: 'Create Permission',
            slug: 'permission.create',
            module: 'Permission',
        });

        const p10 = await this.permissionRepo.save({
            name: 'View Permission',
            slug: 'permission.view',
            module: 'Permission',
        });


        const superAdminRole = await this.roleRepo.save({
            name:'SUPERADMIN',
            permissions: [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]
        });

        const hashedPassword = await bcrypt.hash('admin123', 10);
        await this.userRepo.save({
            name:'superadmin',
            email: 'admin@distributor.com',
            password: hashedPassword,
            role: superAdminRole
        });

        return 'Seeding Berhasil! Login pake admin@distributor.com / admin123';
    }

}