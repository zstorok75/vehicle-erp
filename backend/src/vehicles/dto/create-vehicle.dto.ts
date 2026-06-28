import { IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class CreateVehicleDto {
  @IsOptional()
  @IsString()
  @Length(3, 20)
  licensePlate?: string;

  @IsString()
  @Length(17, 17)
  vin!: string;

  @IsString()
  brand!: string;

  @IsString()
  model!: string;

  @IsInt()
  @Min(1900)
  @Max(Number(new Date().getFullYear()))
  productionYear!: number;
}
