import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'MA_CLE_SUPER_SECRETE', // En prod, on met ça dans le .env !
      signOptions: { expiresIn: '1h' }, // Le bracelet expire après 1h
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
