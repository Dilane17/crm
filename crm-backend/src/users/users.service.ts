/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async create(data: any) {
    // 1. Hachage du mot de passe (Sécurité)
    const salt = await bcrypt.genSalt(10);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // 2. Création de l'entité avec le mot de passe haché
    const newUser = this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });

    // 3. Sauvegarde réelle en base de données
    return await this.usersRepository.save(newUser);
  }
}
