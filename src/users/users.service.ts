import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // validasi user email belum ada
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email}
    });
    if (existingUser) {
        throw new ConflictException('Email already exists')
    }
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(createUserDto);
  }

  async findAll() : Promise<User[]>{
    return await this.userRepository.find({
      select: ['id', 'email', 'phone', 'role', 'created_at', 'updated_at']
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select:  ['id', 'email', 'phone', 'role', 'created_at', 'updated_at']
    });
    if ( !user ) {
      throw new NotFoundException(`user with id ${id} not found`)
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
    // Method ini untuk login, jadi return dengan password
  }

    async update(id: string, updateUserDto: UpdateUserDto) {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      Object.assign(user, updateUserDto);
      await this.userRepository.save(user);
      // Password otomatis di-hash oleh @BeforeUpdate hook

      // Return tanpa password
      const { password, ...result } = user;
      return result as User;
    }

    async remove(id: string): Promise<void> {
      await this.userRepository.softDelete(id);
    }

}
