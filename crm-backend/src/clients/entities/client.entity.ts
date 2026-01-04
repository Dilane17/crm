import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Interaction } from '../../interactions/entities/interaction.entity';
@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ nullable: true })
  entreprise: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  telephone: string;

  @CreateDateColumn()
  createdAt: Date;

  //Relation : Plusieur clients appartiennent à un seul Utilisateur
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => User, (user) => user.clients)
  user: User;
  //Relation inverse définie dans interaction.entity.ts
  @OneToMany(() => Interaction, (interaction) => interaction.client)
  interactions: Interaction[];
}
