import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}
   async lockFunds(transactionId: string) {
     return this.prisma.transaction.update({
       where: { id: transactionId },
       data: { status: 'FUNDS_LOCKED' },
     });
   }
  async initiateTransaction(data: any) {
    // Create a new transaction record in the database
    return this.prisma.transaction.create({
      data: {
        listingId: data.listingId,
        buyerId: data.buyerId,
        sellerId: data.sellerId,
        totalAmount: data.totalAmount,
        status: 'INITIATED',
      },
    });
  }

  async findAll() {
    return this.prisma.transaction.findMany({
      include: {
        listing: true, // This will include the land details!
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}