import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // Get all users with PENDING KYC
  async getPendingUsers() {
    return this.prisma.user.findMany({
      where: { kycStatus: 'PENDING' },
      select: { id: true, firstName: true, lastName: true, email: true, phone: true, kycStatus: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Approve a user's KYC
  async approveKyc(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.update({
      where: { id: userId },
      data: { kycStatus: 'VERIFIED' },
    });
  }
}