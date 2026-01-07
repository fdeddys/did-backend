import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/role.entity';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>,
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        private redisService: RedisService,
    ){}

    async create(createUserDto: CreateUserDto): Promise<User> {

        const { password, roleId, ...userData } = createUserDto;

        const role = await this.roleRepository.findOne({
          where: { id: roleId}
        });

        if (!role) {
            throw new NotFoundException('ROle ID tidak ditemukan ')
        }

        // validasi user email belum ada
        const existingUser = await this.userRepository.findOne({
            where: { email: userData.email}
        });
        if (existingUser) {
            throw new ConflictException('Email already exists')
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepository.create({
            ...userData,
            password: hashedPassword,
            role: role
        });
        const savedUser = await this.userRepository.save(user);
        const {password:_ , ...result} = savedUser;
        return result as User;
    }

    async findAll() : Promise<User[]>{
        return await this.userRepository.find({
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                created_at: true,
                updated_at: true,
                role: {
                    id: true,
                    name: true,
                    permissions: {
                        id: true,
                        name: true,
                        slug: true
                    }
                }
            },
            relations: {
              role: {
                permissions: true
              }
            }
        });
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                created_at: true,
                updated_at: true,
                role: {
                    id: true,
                    name: true,
                    permissions: {
                        id: true,
                        name: true,
                        slug: true
                    }
                }
            },
            relations: {
              role: {
                permissions: true
              }
            }
        });
        if ( !user ) {
            throw new NotFoundException(`user with id ${id} not found`)
        }
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { email }, 
            relations : ['role', 'role.permissions'],
        });
    }

    async update(id: string, updateUserDto: UpdateUserDto) {

        // validasi role
        // generate hash password
        // data untuk update
        const { roleId, password, ...userData } = updateUserDto;

        const user = await this.userRepository.findOne({ 
            where: { id } ,
            relations: ['role']
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // validasi role
        if (roleId && roleId !== user.role?.id) {
            const newRole = await this.roleRepository.findOne({
                where : {
                    id: roleId
                } 
            })
            if (!newRole) {
                throw new NotFoundException(`Role with ID ${roleId} not found`)
            }
            user.role = newRole;
        }

        // hash
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        // data untuk update
        Object.assign(user, userData);
        await this.userRepository.save(user);

        const { password:_ , ...result } = user;

        // force logout
        this.forceLogout(id);
        return result as User;
    }

    async remove(id: string): Promise<void> {

        const user = this.userRepository.findOne({
            where: { id}
        })

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        await this.userRepository.softDelete(id);

        this.forceLogout(id);
    }

    async forceLogout(id: string) {
        await this.redisService.del(`user_perms:${id}`);
    }

}
