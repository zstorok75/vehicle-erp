import { Controller, Post, Patch, Body, Get, Param } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@ApiTags('vehicles') // <-- Ez csoportosítja a végpontokat a Swagger felületen
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.vehiclesService.findOneById(+id, false); // A '+' jel számmá alakítja a stringet
  }

  @Get(':vin')
  findOneByVin(@Param('vin') vin: string) {
    return this.vehiclesService.findOneByVin(vin, false);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }
}
