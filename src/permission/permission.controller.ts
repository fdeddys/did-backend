import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permission.service';
import { RequirePermission } from '../auth/decorators/permissions.decorator';
import { CreatePermissionDto } from './dto/create-permisson.dto';
import { PermissionGuard } from '../auth/guards/permissions.guard';

@Controller('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionsService) {}

  @Post()
  @UseGuards(PermissionGuard)
  @RequirePermission('permission.create')
  create(@Body() createPermission: CreatePermissionDto) {
    return this.permissionService.create(createPermission);
  }

  @Get()
  @UseGuards(PermissionGuard)
  @RequirePermission('permission.view')
  findAll() {
    return this.permissionService.findAll();
  }
}
