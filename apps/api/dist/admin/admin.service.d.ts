import { PrismaService } from '../prisma/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getPendingUsers(): Promise<{
        email: string;
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
        kycStatus: import("@prisma/client").$Enums.KycStatus;
        createdAt: Date;
    }[]>;
    approveKyc(userId: string): Promise<{
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
