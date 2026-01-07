import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guards/permissions.guard';
import { RequirePermission } from 'src/auth/decorators/permissions.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(PermissionGuard)
  @RequirePermission('user.create')
  create(@Body() createUserDto: CreateUserDto, @Req() req: any) {

    const user = req.user; 
    console.log('User ID dari JWT:', user.id);
    console.log('Email dari JWT:', user.email);
    
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(PermissionGuard)
  @RequirePermission('user.view')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(PermissionGuard)
  @RequirePermission('user.view')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(PermissionGuard)
  @RequirePermission('user.update')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(PermissionGuard)
  @RequirePermission('user.delete')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
