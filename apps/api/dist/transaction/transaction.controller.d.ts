import { TransactionService } from './transaction.service';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    initiate(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        listingId: string;
        buyerId: string;
        sellerId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        platformFeePct: import("@prisma/client/runtime/library").Decimal;
        dealerCommPct: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.TransactionStatus;
        gatewayRef: string | null;
        trustAccountRef: string | null;
    }>;
    lockFunds(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        listingId: string;
        buyerId: string;
        sellerId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        platformFeePct: import("@prisma/client/runtime/library").Decimal;
        dealerCommPct: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.TransactionStatus;
        gatewayRef: string | null;
        trustAccountRef: string | null;
    }>;
    findAll(): Promise<({
        listing: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.ListingStatus;
            titleNumber: string;
            tenureType: string;
            sizeAcres: import("@prisma/client/runtime/library").Decimal;
            priceUgx: import("@prisma/client/runtime/library").Decimal;
            description: string | null;
            latitude: import("@prisma/client/runtime/library").Decimal;
            longitude: import("@prisma/client/runtime/library").Decimal;
            boundaryGeoJson: import("@prisma/client/runtime/library").JsonValue | null;
            titleDocUrl: string | null;
            searchReportUrl: string | null;
            dealerId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        listingId: string;
        buyerId: string;
        sellerId: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        platformFeePct: import("@prisma/client/runtime/library").Decimal;
        dealerCommPct: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.TransactionStatus;
        gatewayRef: string | null;
        trustAccountRef: string | null;
    })[]>;
}
