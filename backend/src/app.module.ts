import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'erp_user',
      password: 'erp_password',
      database: 'vehicle_erp',
      entities: [Vehicle], // Ide jönnek a tábláink (Entity-k)
      synchronize: true, // Automatikusan létrehozza a táblákat a kódból (CSAK FEJLESZTÉSKOR HASZNÁLHATÓ!!!)
      logging: true,
    }),
    VehiclesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
