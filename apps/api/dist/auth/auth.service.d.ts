import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
type RegisterDto = {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    role: any;
};
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        user: {
            email: string;
            id: string;
            role: import("@prisma/client").$Enums.UserRole;
            firstName: string;
            lastName: string;
        };
        token: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import("@prisma/client").$Enums.UserRole;
        };
        token: string;
    }>;
    private generateToken;
}
export {};
