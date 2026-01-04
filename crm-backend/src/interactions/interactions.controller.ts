/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createInteractionDto: CreateInteractionDto, @Req() req: any) {
    const userId = req.user.sub;
    return this.interactionsService.create(createInteractionDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get('client/:clientId')
  findAllByClient(@Param('clientId') clientId: string, @Req() req: any) {
    const userId = req.user.sub;
    return this.interactionsService.findByClient(+clientId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interactionsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInteractionDto: UpdateInteractionDto,
    @Req() req: any,
  ) {
    const userId = req.user.sub;
    return this.interactionsService.update(+id, updateInteractionDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interactionsService.remove(+id);
  }
}
