import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', nullable: true })
  licensePlate?: string;

  @Column({ type: 'varchar', unique: true, nullable: false, length: 17 })
  vin!: string;

  @Column({ type: 'varchar', nullable: false })
  brand!: string;

  @Column({ type: 'varchar', nullable: false })
  model!: string;

  @Column({ type: 'int', nullable: false, default: new Date().getFullYear() })
  productionYear!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
