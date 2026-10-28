import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUserDto): Promise<{
        email: string;
        id: string;
        role: import("@prisma/client").$Enums.UserRole;
        firstName: string;
        lastName: string;
        phone: string;
        kycStatus: import("@prisma/client").$Enums.KycStatus;
        createdAt: Date;
    }>;
    findByEmail(email: string): Promise<{
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
    } | null>;
    findById(id: string): Promise<{
        email: string;
        id: string;
        role: import("@prisma/client").$Enums.UserRole;
        firstName: string;
        lastName: string;
        phone: string;
        kycStatus: import("@prisma/client").$Enums.KycStatus;
        createdAt: Date;
    }>;
    validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
