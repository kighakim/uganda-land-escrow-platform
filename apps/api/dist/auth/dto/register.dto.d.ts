export declare enum UserRole {
    BUYER = "BUYER",
    SELLER = "SELLER",
    DEALER = "DEALER",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN"
}
export declare class RegisterDto {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    role: UserRole;
}
