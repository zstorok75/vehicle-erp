import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true, nullable: true })
  licensePlate!: string | null;

  @Column({ unique: true })
  vin!: string;

  @Column()
  make!: string;

  @Column()
  model!: string;

  @Column({ type: 'int', default: 2026 })
  year!: number;

  @Column({ default: 'ACTIVE' })
  status!: string;
}
