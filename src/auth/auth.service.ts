import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto } from './dto/auth-response.dto';
import { Redis } from 'ioredis';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        @Inject('REDIS_CLIENT') private readonly redis: Redis 
    ){}

    async login(loginDto: LoginDto): Promise<AuthResponseDto>{

        // find by email
        const user = await this.userService.findByEmail(loginDto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credential');
        }
        const isPasswordValid = await bcrypt.compare(
            loginDto.password,
            user.password
        )
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credential')
        }
        const payload = {
            sub : user.id,
            email : user.email,
            role: user.role.name,
            id: user.id
        }

        const expiredKeyToken = this.configService.get<string>('JWT_EXPIRES_IN');
        const ttlToken = Number(expiredKeyToken);
        const expiredKeyRefresh = this.configService.get<string>('JWT_REFRESH_EXPIRES_IN');
        const ttlRefresh = Number(expiredKeyRefresh);

        const access_token = this.generateToken(payload, ttlToken);
        //this.jwtService.sign(payload);
        const refresh_token = this.generateRefreshToken(payload, ttlRefresh);

        const redisKey = `refresh_token:${payload.sub}`;
        
        await this.redis.set(
            redisKey, refresh_token, 'EX', ttlRefresh
        );

        const perms = user.role.permissions.map(p => p.slug)
        await this.redis.set(`user_perms:${user.id}`, JSON.stringify(perms), 'EX', ttlRefresh);

        const permissionArray = user.role.permissions.map(perm => ({
            name : perm.name,
            slug: perm.slug
        }));

        return {
            access_token,
            refresh_token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            role: user.role.name,
            permission: permissionArray
        }
    }


    generateToken(payload: any, ttl: number): string {
        payload.type = 'access';
        return this.jwtService.sign(
            payload,{
                secret: this.configService.get<string>('JWT_SECRET'),
                expiresIn: ttl
                // this.configService.get<string>('JWT_EXPIRES_IN') as any,
            });

    }

    generateRefreshToken(payload: any, ttl: number): string {
        payload.type = 'refresh';
        return this.jwtService.sign(
            payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: ttl
                // this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') as any,
            });
    }

    async refreshToken(refresh_token: string): Promise<{ access_token: string, refresh_token: string }> {
        try {
            // Verify refresh token
            const payload = this.jwtService.verify(refresh_token, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            });

            if (payload.type !== 'refresh') {
                throw new UnauthorizedException('Invalid type Access Token!');
            }

            const redisKey = `refresh_token:${payload.sub}`;
            const storedToken = await this.redis.get(redisKey);
            if (!storedToken || storedToken !== refresh_token) {
                throw new UnauthorizedException('Refresh token invalid atau sudah pernah di pakai')
            }

            const expiredKeyToken = this.configService.get<string>('JWT_EXPIRES_IN');
            const ttlToken = Number(expiredKeyToken);
            const expiredKeyRefresh = this.configService.get<string>('JWT_REFRESH_EXPIRES_IN');
            const ttlRefresh = Number(expiredKeyRefresh);

            // Generate new access token
            const newPayload = {
                sub: payload.sub,
                email: payload.email,
                role: payload.role,
            };
    
            const access_token = this.generateToken(newPayload, ttlToken);
            
            // this.jwtService.sign(newPayload,{
            //     secret: this.configService.get<string>('JWT_SECRET'),
            //     expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') as any,
            //     });

            const newRefreshToken = this.generateRefreshToken(newPayload, ttlRefresh)
            
            // this.jwtService.sign(newPayload, {
            //     secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            //     expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') as any
            // })

            await this.redis.set(redisKey, newRefreshToken, 'EX', ttlRefresh)
    
            return { 
                access_token :access_token,
                refresh_token : newRefreshToken,
            };
        } catch (error) {
          throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async logout(userId: string) {

        const redisKey = `refresh_token:${userId}`;        
        await this.redis.del(redisKey);
      
        return {
          statusCode: 200,
          message: 'Logout berhasil, sesi telah dihapus.',
        };
    }

}
