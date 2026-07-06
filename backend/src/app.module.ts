import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    // Az .env file beolvasása
    ConfigModule.forRoot({ isGlobal: true }),

    // A TypeORM konfigurálása aszinkron módba
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          // Automatikusan létrehozza a táblákat a kódból ha TRUE (CSAK FEJLESZTÉSKOR HASZNÁLHATÓ!!!)
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
          // Automatikusan loggol minden DB műveletet, fejlesztésnél hibakereséshez hasznos
          // logging: configService.get<boolean>('DB_LOGGING'),
          logging: true,
          // Automatikusan betölti az összes @Entity()-t
          autoLoadEntities: configService.get<boolean>('DB_AUTO_LOAD_ENTITIES'),
        };
      },
    }),
    VehiclesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
