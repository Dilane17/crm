import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { InteractionsModule } from './interactions/interactions.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // 1. On charge le module de config en premier
    ConfigModule.forRoot({ isGlobal: true }),

    // 2. On configure TypeORM de façon dynamique
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: 'db_crm.sqlite',
        autoLoadEntities: true,
        synchronize: true, // Désactiver en production, mais parfait pour ton Sprint 1
      }),
    }),
    AuthModule,
    UsersModule,
    ClientsModule,
    InteractionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
