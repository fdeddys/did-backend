import { Permission } from "../../permission/entities/permission.entity";

export class AuthResponseDto {
    access_token: string;
    refresh_token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
    role: string;
    // permission: {
    //     name: string;
    //     slug: string;
    // }[];
    permission: PermissionItem[]

}

interface PermissionItem {
    name: string;
    slug: string;
}