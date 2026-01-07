import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { RoleService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { RequirePermission } from "../auth/decorators/permissions.decorator"
import { PermissionGuard } from "../auth/guards/permissions.guard"


@Controller('roles')
export class RoleController {

    constructor(private roleService: RoleService) {}

    @Post()
    @UseGuards(PermissionGuard)
    @RequirePermission('role.create')
    create(@Body() createRole : CreateRoleDto) {
        return this.roleService.create(createRole);
    }

    @Get()
    @UseGuards(PermissionGuard)
    @RequirePermission('role.view')
    findAll() {
        return this.roleService.findAll();
    }

}