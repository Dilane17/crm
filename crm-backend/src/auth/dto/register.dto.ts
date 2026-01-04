import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  nom: string;

  @IsEmail({}, { message: 'L’adresse email n’est pas valide' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit faire au moins 6 caractères' })
  password: string;
}
