import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(id: string): Promise<{
        email: string;
        id: string;
        role: import("@prisma/client").$Enums.UserRole;
        firstName: string;
        lastName: string;
        phone: string;
        kycStatus: import("@prisma/client").$Enums.KycStatus;
        createdAt: Date;
    }>;
}
