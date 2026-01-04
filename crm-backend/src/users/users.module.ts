import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // On enregistre l'entité User
  providers: [UsersService],
  exports: [UsersService], // Important pour que AuthModule puisse l'utiliser
})
export class UsersModule {}
