import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ListingService {
  constructor(private prisma: PrismaService) {}

  // We use 'any' here to bypass strict Prisma relation errors for now
  async create(createListingDto: any) {
    return this.prisma.listing.create({
      data: createListingDto,
    });
  }

  async findAll() {
    return this.prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.listing.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateListingDto: any) {
    return this.prisma.listing.update({
      where: { id },
      data: updateListingDto,
    });
  }

  async remove(id: string) {
    return this.prisma.listing.delete({
      where: { id },
    });
  }
}