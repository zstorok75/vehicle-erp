import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehiclesService implements OnModuleInit {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async onModuleInit() {
    const count = await this.vehicleRepository.count();

    if (count === 0) {
      console.log('🎲 A MySQL adatbázis üres. Mock adatok generálása...');

      await this.vehicleRepository.save([
        {
          licensePlate: 'AA-BB-123',
          vin: 'WBA12345678TEST001',
          make: 'Tesla',
          model: 'Model S',
          year: 2024,
          status: 'Aktív',
        },
        {
          licensePlate: 'CC-DD-456',
          vin: 'WBA12345678TEST002',
          make: 'BMW',
          model: 'i4',
          year: 2023,
          status: 'Szervizben',
        },
        {
          licensePlate: 'EE-FF-789',
          vin: 'WBA12345678TEST003',
          make: 'Porsche',
          model: 'Taycan',
          year: 2026, // Itt a default értéked is pontosan 2026!
          status: 'Aktív',
        },
        {
          licensePlate: null, // Megengedett a null érték
          vin: 'WBA12345678TEST004',
          make: 'Audi',
          model: 'e-tron',
          year: 2024,
          status: 'Inaktív',
        },
      ]);

      console.log('🌱 Adatbázis sikeresen feltöltve!');
    }
  }

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
