/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token manquant');
    }

    try {
      // C'est ici qu'on ouvre le "bracelet" pour voir ce qu'il y a dedans
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'MA_CLE_SUPER_SECRETE', // La même que dans ton AuthModule
      });

      // On attache les infos de l'utilisateur à l'objet request
      // C'est ce qui nous permettra de récupérer l'ID plus tard !
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
