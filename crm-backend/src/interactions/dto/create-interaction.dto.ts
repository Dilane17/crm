import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateInteractionDto {
  @IsString()
  @IsNotEmpty({ message: 'Le type est requis (ex: Appel, Email)' })
  type: string;

  @IsString()
  @IsNotEmpty({ message: 'Le sujet est requis' })
  sujet: string;

  @IsString()
  @IsNotEmpty({ message: 'Le contenu ne peut pas être vide' })
  @MinLength(5, {
    message: 'Le contenu doit être un peu plus détaillé (5 car. min)',
  })
  contenu: string;

  @IsNumber({}, { message: 'Le clientId doit être un nombre valide' })
  @IsNotEmpty()
  clientId: number;
}
