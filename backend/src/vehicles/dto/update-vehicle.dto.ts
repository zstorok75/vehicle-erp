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
  licensePlate?: string;

  @IsString()
  @Length(17, 17, {
    message: 'Az alvázszámnak pontosan 17 karakter hosszúnak kell lennie!',
  })
  vin!: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsInt()
  @Min(1900, { message: 'A jármű gyártási ideje nem lehet 1900 elött!' })
  @Max(Number(new Date().getFullYear()) + 1, {
    message: 'A jármű nem lehet fiatalabb az aktuális gyártási évnél!',
  })
  productionYear?: number;

  @IsOptional()
  @IsDate()
  @Min(Date.parse('1900, 1, 1'))
  @Max(new Date().getFullYear())
  createdAt!: Date;
}
