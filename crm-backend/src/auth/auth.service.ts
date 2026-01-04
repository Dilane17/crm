import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
/*import { access } from 'fs';*/

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    return await this.userService.create(data);
  }

  async login(loginDto: LoginDto) {
    // 1. On cherche l'utilisateur par son email
    const user = await this.userService.findByEmail(loginDto.email);

    // 2. Si l'utilisateur n'existe pas, on lance une erreur
    // ASTUCE MENTOR : On utilise le même message pour l'email et le mot de passe
    // pour ne pas donner d'indices aux hackers !
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // 3. On compare le mot de passe tapé (loginDto.password)
    // avec le mot de passe haché en base (user.password)
    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    // 4. Si ça ne correspond pas, erreur
    if (!isMatch) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    // On prépare les info qu'on veut mettre dans le jeton
    const payload = { sub: user.id, email: user.email };
    //On génère le jeton
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { id: user.id, email: user.email, nom: user.nom },
    };
    // 5. Si tout est OK, on renvoie les infos de l'utilisateur (sans le password !)
    // Pour l'instant on renvoie juste l'objet, on mettra le JWT juste après.
    /* const { password, ...result } = user;
    return {
      message: 'Connexion réussie !',
      user: result,
    };*/
  }
}
