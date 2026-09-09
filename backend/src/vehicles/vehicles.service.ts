import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  // Új jármű mentése az adatbázisba
  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    // Ellenőrizzük alvázszám alapján, hogy létezik e, ha igen hibát dobunk?
    if (await this.existsByVin(createVehicleDto.vin)) {
      throw new HttpException(
        'Ez az alvázszám már szerepel a rendszerben!',
        HttpStatus.CONFLICT,
      );
    } else {
      // A DTO alapján létrehozunk egy új Vehicle példányt
      const newVehicle = this.vehicleRepository.create(createVehicleDto);
      return this.vehicleRepository.save(newVehicle);
    }
  }

  // Összes jármű lekérdezése
  async findAll(): Promise<Vehicle[]> {
    return await this.vehicleRepository.find();
  }

  // Lekérni egy autót az "id" alapján
  async findOneById(
    id: number,
    isNullReturnAccept: boolean,
  ): Promise<Vehicle | null> {
    if (isNullReturnAccept || (await this.existsById(id))) {
      return this.vehicleRepository.findOne({ where: { id: id } });
    } else {
      throw new HttpException(
        'A jármű nem található a rendszerben!',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOneByVin(
    vin: string,
    isNullReturnAccept: boolean,
  ): Promise<Vehicle | null> {
    if (isNullReturnAccept || (await this.existsByVin(vin))) {
      return await this.vehicleRepository.findOneBy({ vin: vin });
    } else {
      throw new HttpException(
        'A keresett alvázszám nem található',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // TODO
  // A megfelelő jogosultság meglétekor elfogadjuk az alvázszám módosítását
  async update(id: number, vehicle: UpdateVehicleDto): Promise<Vehicle | null> {
    // Ellenőrizzük, hogy a megadott id és a vehicle.id azonos e.
    //  ha nem Exception
    if (id === vehicle.id) {
      const vehicleById: Vehicle | null = await this.findOneById(id, true);
      const vehicleByVin: Vehicle | null = await this.findOneByVin(
        vehicle.vin,
        true,
      );
      // összehasonlítani a kettőt id és vin alapján
      if (
        vehicleById !== null &&
        vehicleByVin !== null &&
        vehicleById.vin === vehicleByVin.vin &&
        vehicleById.id === vehicleByVin.id
      ) {
        // ha a 2 vin és az id is azonos mentjük
        await this.vehicleRepository.update(id, vehicle);
        return this.findOneById(id, false);
      } else {
        throw new HttpException(
          'A megadott ID és a jármű ID nem azonos',
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        'A megadott adatok nem konzisztensek!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async existsById(id: number): Promise<boolean> {
    return this.vehicleRepository.existsBy({ id: id });
  }

  async existsByVin(vin: string): Promise<boolean> {
    // Lekérjük az alvázszám szerint egy járművet
    return this.vehicleRepository.existsBy({ vin: vin });
  }
}
