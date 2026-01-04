import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom du clients es requis' })
  nom: string;

  @IsString()
  @IsOptional()
  entreprise: string;

  @IsEmail({}, { message: 'Veuillez fournis une email valide' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Le numéro de téléphone est requis' })
  telephone: string;
}
