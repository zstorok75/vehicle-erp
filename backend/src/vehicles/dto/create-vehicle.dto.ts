import { IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class CreateVehicleDto {
  @IsOptional()
  @IsString()
  @Length(3, 20)
  licensePlate?: string;

  @IsString()
  @Length(17, 17, {
    message: 'Az alvázszámnak pontosan 17 karakter hosszúnak kell lennie!',
  })
  vin!: string;

  @IsString()
  brand!: string;

  @IsString()
  model!: string;

  @IsInt()
  @Min(1900, { message: 'A jármű gyártási ideje nem lehet 1900 elött!' })
  @Max(Number(new Date().getFullYear()) + 1, {
    message: 'A jármű nem lehet fiatalabb az aktuális gyártási évnél!',
  })
  productionYear!: number;
}
