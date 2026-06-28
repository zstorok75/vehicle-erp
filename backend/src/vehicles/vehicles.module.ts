import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])], // Elérhetővé tesszük a Vehicle Entity-t ebben a modulban
  controllers: [VehiclesController],
  providers: [VehiclesService],
  exports: [TypeOrmModule],
})
export class VehiclesModule {}
