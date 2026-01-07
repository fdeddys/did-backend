import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "./entities/permission.entity"
import { Repository } from "typeorm";
import { CreatePermissionDto } from "./dto/create-permisson.dto";


@Injectable()
export class PermissionsService {
    
    constructor(
        @InjectRepository(Permission)
        private permissionService: Repository<Permission>
    ){}

    async create(dto: CreatePermissionDto) {
        const existing = await this.permissionService.findOne({
            where: {
                slug: dto.slug
            }
        })

        if (existing) {
            throw new ConflictException('Slug already exists')
        }

        const permission = this.permissionService.create(dto)
        return this.permissionService.save(permission)

    }

    async findAll(){
        return this.permissionService.find();
    }

}