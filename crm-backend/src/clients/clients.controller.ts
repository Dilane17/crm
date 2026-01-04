/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @UseGuards(AuthGuard) // On protège la route ici
  @Post()
  async create(@Body() createClientDto: CreateClientDto, @Req() req: any) {
    // Grâce au Guard, req.user contient maintenant l'ID de l'utilisateur (le 'sub')
    const userId = req.user.sub;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await this.clientsService.create(createClientDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userId = req.user.sub; // on récupère l'idée du token
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.clientsService.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @Req() req: any,
  ) {
    const userId = req.user.sub;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.clientsService.update(+id, updateClientDto, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.sub;
    // On convertis l'id de string vers number avec le +
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return await this.clientsService.remove(+id, userId);
  }
}
