import { Module } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { InteractionsController } from './interactions.controller';
import { Interaction } from './entities/interaction.entity';
import { Client } from '../clients/entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Interaction, Client])],
  controllers: [InteractionsController],
  providers: [InteractionsService],
})
export class InteractionsModule {}
