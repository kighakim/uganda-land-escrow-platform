import { IsString, IsOptional } from 'class-validator';

export class DisburseTransactionDto {
  @IsString()
  @IsOptional()
  notes?: string; 
}