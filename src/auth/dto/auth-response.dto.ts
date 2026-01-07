import { Permission } from "../../roles/permission.entity";

export class AuthResponseDto {
    access_token: string;
    refresh_token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
    role: string;
    permission: Record<string, string>[]

}