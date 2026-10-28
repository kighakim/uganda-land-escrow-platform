import { IsNumber, IsUUID, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  listingId: string;

  @IsUUID()
  sellerId: string;

  @IsNumber()
  @Min(100000) 
  totalAmount: number;
}