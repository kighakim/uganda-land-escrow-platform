import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateListingDto {
  @IsString()
  titleNumber: string; // e.g., "Block 123 Plot 45"

  @IsString()
  tenureType: string; // e.g., "Mailo", "Freehold"

  @IsNumber()
  @Min(0)
  sizeAcres: number;

  @IsNumber()
  @Min(0)
  priceUgx: number;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  @IsOptional()
  description?: string;
}