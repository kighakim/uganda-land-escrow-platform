import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getPendingUsers(): Promise<{
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
        kycStatus: import("@prisma/client").$Enums.KycStatus;
        createdAt: Date;
    }[]>;
    approveKyc(id: string): Promise<{
        email: string;
        id: string;
        role: import("@prisma/client").$Enums.UserRole;
        firstName: string;
        lastName: string;
        phone: string;
        nin: string | null;
        passwordHash: string;
        kycStatus: import("@prisma/client").$Enums.KycStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
