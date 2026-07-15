import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehiclesService implements OnModuleInit {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async onModuleInit() {}

  // Új jármű mentése az adatbázisba
  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    // A DTO alapján létrehozunk egy új Vehicle példányt
    const newVehicle = this.vehicleRepository.create(createVehicleDto);
    return await this.vehicleRepository.save(newVehicle);
  }

  // Összes jármű lekérdezése
  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleRepository.find();
  }

  // Lekérni egy autót az "id" alapján
  async findOne(id: number): Promise<Vehicle | null> {
    const vehicle: Vehicle | null = await this.vehicleRepository.findOne({
      where: { id: id },
    });
    return vehicle;
  }
}
