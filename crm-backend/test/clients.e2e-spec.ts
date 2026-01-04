import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('ClientsController (e2e)', () => {
  let app: INestApplication;

  // On lance l'application avant les tests
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // Crucial pour tester tes DTO !
    await app.init();
  });

  // TEST 1 : Vérifier la sécurité (Unauthorized)
  it('/clients (GET) - Doit bloquer la requête sans Token', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return request(app.getHttpServer()).get('/clients').expect(401); // On s'attend à recevoir une 401
  });

  // On ferme l'application après les tests
  afterAll(async () => {
    await app.close();
  });
});
