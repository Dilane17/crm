import { IsEmail, IsNotEmpty, IsString /*MinLength */ } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'L’adresse email n’est pas valide' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
