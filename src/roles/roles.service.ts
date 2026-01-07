import { ConflictException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Role } from "./role.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";


@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role)
        private roleService: Repository<Role>
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

}