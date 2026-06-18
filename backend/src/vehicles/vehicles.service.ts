import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  // Új jármű mentése az adatbázisba
  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const newVehicle = this.vehicleRepository.create(createVehicleDto);
    return await this.vehicleRepository.save(newVehicle);
  }

  // Az összes jármű lekérése
  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleRepository.find();
  }

  // Egy jármű ID alapján
  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOneBy({ id });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID: ${id} not found`);
    }
    return vehicle;
  }

  // Jármű adatainak frissítése
  async update(
    id: number,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<Vehicle> {
    const vehicle = await this.findOne(id); // Ellenőrizzük, hogy létezik e a jármű
    Object.assign(vehicle, updateVehicleDto); // Összemásoljuk a meglévő adatokat az újakkal
    return await this.vehicleRepository.save(vehicle);
  }

  // Egy jármű végleges törlése
  async remove(id: number): Promise<void> {
    const vehicle = await this.findOne(id);
    await this.vehicleRepository.remove(vehicle);
  }
}
