import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';

@Entity('utilisateurs')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];
}
