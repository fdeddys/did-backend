import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
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

    @Patch(":id/permissions")
    @UseGuards(PermissionGuard)
    @RequirePermission('role.update')
    async assignPermission(
        @Param('id') id: string,
        @Body('permissionIds') permissionIds: string[]
    ){
        return await this.roleService.assignPermission(id, permissionIds);

    }

}