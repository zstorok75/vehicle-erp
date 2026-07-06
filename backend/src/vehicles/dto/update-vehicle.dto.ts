import {
  IsDate,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateVehicleDto {
  @IsNumber()
  id!: number;

  @IsOptional()
  @IsString()
  @Length(3, 20)
  licensePlate?: string;

  @IsOptional()
  @IsString()
  @Length(17, 17)
  vin?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsInt()
  @Min(1900)
  @Max(Number(new Date().getFullYear()))
  productionYear?: number;

  @IsDate()
  @Min(Date.parse('1900, 1, 1'))
  @Max(new Date().getFullYear())
  createdAt!: Date;
}
