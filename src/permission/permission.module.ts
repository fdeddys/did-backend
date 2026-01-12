import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permission } from "./entities/permission.entity";
import { PermissionsService } from "./permission.service";
import { PermissionController } from "./permission.controller";


@Module({
    imports: [
        TypeOrmModule.forFeature([Permission]),
    ],
    providers: [PermissionsService],
    controllers: [PermissionController],
    exports: [PermissionsService]
})
export class PermissionModule {

}