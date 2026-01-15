import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Role } from "./role.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { PermissionsService } from "../permission/permission.service";


@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role)
        private roleService: Repository<Role>,
        private permissionService: PermissionsService,
    ){}

    async create (roleDto: CreateRoleDto) {
        const name = roleDto.name.toUpperCase();

        const existing = this.roleService.findOne({
            where : {name}
        })
        if (!existing) {
            throw new ConflictException('Role already exists')
        }
        const newRole = this.roleService.create({name})
        return this.roleService.save(newRole);
    }

    async findAll() {
        return await this.roleService.find({
            select:  {
                id: true,
                name: true,
                permissions: {
                    id: true,
                    name: true,
                    slug: true
                }
            },
            relations: ['permissions']
        })
    }


    async findById(id: string): Promise<Role> {
        const role = await this.roleService.findOne({
            where: {
                id
            }
        })
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return role;
    }

    async assignPermission(roleId: string, permissionIds: string[]) {

        // cari role
        const role = await this.roleService.findOne({
            where: {id : roleId},
            relations: ['permissions']
        })
        if (!role) {
            throw new NotFoundException('ROle not found')
        }
        const permissions = await this.permissionService.findByIds(permissionIds);
        if (permissionIds.length != permissionIds.length) {
            throw new NotFoundException('some permission not found !')
        }
        role.permissions = permissions;
        return await this.roleService.save(role);

    }

}