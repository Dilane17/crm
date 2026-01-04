import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { User } from '../../users/entities/user.entity';

@Entity('interactions')
export class Interaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // ex: 'Appel', 'Email'

  @Column()
  sujet: string;

  @Column({ type: 'text' }) // 'text' permet de mettre de longs paragraphes
  contenu: string;

  @CreateDateColumn() // C'est ton champ "Enregistrer" automatique
  createdAt: Date;

  // RELATION : Plusieurs interactions appartiennent à UN SEUL client
  @ManyToOne(() => Client, (client) => client.interactions, {
    onDelete: 'CASCADE',
  })
  client: Client;

  // RELATION : Plusieurs interactions appartiennent à UN SEUL utilisateur
  @ManyToOne(() => User)
  user: User;
}
