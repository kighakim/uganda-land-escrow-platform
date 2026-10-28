import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: Parameters<AuthService['register']>[0]): Promise<{
        user: {
            email: string;
            id: string;
            role: import("@prisma/client").$Enums.UserRole;
            firstName: string;
            lastName: string;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import("@prisma/client").$Enums.UserRole;
        };
        token: string;
    }>;
}
