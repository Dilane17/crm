import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    // Activer CORS pour permettre les requêtes depuis le frontend
    app.enableCors({
      origin: ['http://localhost:5173', 'http://localhost:5174'], // Ports possibles de Vite
      credentials: true,
    });
    // On force l'écoute sur 127.0.0.1 (IPv4) au lieu de localhost
    await app.listen(3001, '127.0.0.1');

    const url = await app.getUrl();
    console.log(`🚀 SERVEUR ACTIF SUR : ${url}`);
  } catch (error) {
    console.error("❌ LE SERVEUR N'A PAS PU DÉMARRER :", error);
  }
}
bootstrap();
