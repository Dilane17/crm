import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}
  async create(createClientDto: CreateClientDto, userId: number) {
    //On créer l'objet client
    const newClient = this.clientsRepository.create({
      ...createClientDto,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      user: { id: userId } as any, //On lie leclient a l'utilisateur
    });
    return await this.clientsRepository.save(newClient);
  }

  async findAll(userId: number) {
    return await this.clientsRepository.find({
      where: { user: { id: userId } }, //On filtre par l'ID de l'utilisateur
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  async update(id: number, updateClientDto: UpdateClientDto, userId: number) {
    // 1. On cherche le client avec vérification de propriété
    const client = await this.clientsRepository.findOne({
      where: { id: id, user: { id: userId } },
    });

    if (!client) {
      throw new NotFoundException(`Client #${id} introuvable ou accès refusé`);
    }

    // 2. On fusionne les modifications
    const clientMisAJour = this.clientsRepository.merge(
      client,
      updateClientDto,
    );

    // 3. On sauvegarde
    return await this.clientsRepository.save(clientMisAJour);
  }

  async remove(clientId: number, userId: number) {
    //On cherche le client et on vérifie qu'il appartient biena l'utilisateur
    const client = await this.clientsRepository.findOne({
      where: { id: clientId, user: { id: userId } },
    });

    if (!client) {
      throw new NotFoundException(
        `Le client avec l'ID #${clientId} n'existe pas ou ne vous appartient pas`,
      );
    }
    return await this.clientsRepository.remove(client);
  }
}
