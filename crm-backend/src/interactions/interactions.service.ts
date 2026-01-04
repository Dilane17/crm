import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../clients/entities/client.entity';
import { Interaction } from './entities/interaction.entity';

@Injectable()
export class InteractionsService {
  constructor(
    @InjectRepository(Interaction)
    private interactionRepo: Repository<Interaction>,
    @InjectRepository(Client)
    private clientRepo: Repository<Client>,
  ) {}

  async create(dto: CreateInteractionDto, userId: number) {
    // 1. On vérifie si le client existe ET appartient à l'utilisateur connecté
    const client = await this.clientRepo.findOne({
      where: { id: dto.clientId, user: { id: userId } },
    });

    if (!client) {
      // Si le client n'existe pas ou appartient à quelqu'un d'autre
      throw new ForbiddenException(
        "Vous n'avez pas l'autorisation d'ajouter une note à ce client",
      );
    }

    // 2. Si c'est bon, on crée l'interaction
    const nouvelleInteraction = this.interactionRepo.create({
      ...dto,
      client: { id: dto.clientId }, // On lie au client
      user: { id: userId }, // On lie à l'utilisateur qui écrit
    });

    return await this.interactionRepo.save(nouvelleInteraction);
  }

  async findByClient(clientId: number, userId: number) {
    //on vérifie que le client appartient a user
    const client = await this.clientRepo.findOne({
      where: {
        id: clientId,
        user: { id: userId },
      },
    });
    if (!client) {
      throw new ForbiddenException("Accès refusé a l'historique de ce client");
    }
    return await this.interactionRepo.find({
      where: { client: { id: clientId } },
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} interaction`;
  }

  async update(id: number, updateDto: UpdateInteractionDto, userId: number) {
    // On cherche l'interaction en vérifiant le lien avec l'utilisateur
    const interaction = await this.interactionRepo.findOne({
      where: { id: id, user: { id: userId } },
    });

    if (!interaction) {
      throw new NotFoundException(
        `Interaction #${id} introuvable ou accès refusé`,
      );
    }

    // On fusionne les changements
    const interactionMiseAJour = this.interactionRepo.merge(
      interaction,
      updateDto,
    );

    return await this.interactionRepo.save(interactionMiseAJour);
  }

  remove(id: number) {
    return `This action removes a #${id} interaction`;
  }
}
