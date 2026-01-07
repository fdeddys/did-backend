import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RedisService } from "src/redis/redis.service";
import { PERMISSION_KEY } from "../decorators/permissions.decorator";


@Injectable()
export class PermissionGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        private redisService: RedisService
    ){}

    async canActivate(context: ExecutionContext):  Promise<boolean> {
        console.log('--- GUARD PERMISSION TERPANGGIL ---');
        const requiredPermission = this.reflector.get<string>(PERMISSION_KEY, context.getHandler());
        console.log('Required Perm => ', requiredPermission);
        if (!requiredPermission) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log('User from Request:', user); 
        if (!user) {
            // user not found
            return false;
        }

        const userPermissions = await this.redisService.getKey(`user_perms:${user.id}`);
        if (!userPermissions) return false;

        console.log('Required:', requiredPermission);
        console.log('From Redis:', userPermissions);
        console.log('Type of userPermissions:', typeof userPermissions);

        const isAllowed = userPermissions.includes(requiredPermission);
        return isAllowed;
    }

}