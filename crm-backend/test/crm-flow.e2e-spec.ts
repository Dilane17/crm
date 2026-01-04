/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CRM Full Flow (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let clientId: number;
  let interactionId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  // 1. AUTH : On récupère le token
  it(`/auth/login (POST) - Doit connecter l'utilisateur`, async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'ton_email@test.com', password: 'ton_super_password' }); // Utilise des infos qui existent en DB

    expect(response.status).toBe(200);
    authToken = response.body.access_token; // On stocke le token pour la suite
    expect(authToken).toBeDefined();
  });

  // 2. CLIENT : On crée un client
  it('/clients (POST) - Doit créer un client et retourner son ID', async () => {
    const response = await request(app.getHttpServer())
      .post('/clients')
      .set('Authorization', `Bearer ${authToken}`) // On utilise le token ici !
      .send({
        nom: 'Test Automatisé',
        entreprise: 'Robot Inc',
        email: 'robot@test.com',
        telephone: '0102030405',
      });

    expect(response.status).toBe(201);
    clientId = response.body.id; // On récupère l'ID pour l'interaction
    expect(clientId).toBeDefined();
  });

  // 3. INTERACTION : On lie une note au client créé
  it('/interactions (POST) - Doit lier une note au client', async () => {
    const response = await request(app.getHttpServer())
      .post('/interactions')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        type: 'Test',
        sujet: 'Vérification Auto',
        contenu: 'Ceci est un test automatique de bout en bout.',
        clientId: clientId, // Utilisation dynamique de l'ID du test précédent
      });

    expect(response.status).toBe(201);
    interactionId = response.body.id; // On récupère l'ID de l'interaction
    expect(interactionId).toBeDefined();
  });
  // 4. TEST UPDATE CLIENT
  it("/clients/:id (PATCH) - Doit modifier l'entreprise du client", async () => {
    const response = await request(app.getHttpServer())
      .patch(`/clients/${clientId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ entreprise: 'Robot Inc Modifié' });

    expect(response.status).toBe(200);
    expect(response.body.entreprise).toBe('Robot Inc Modifié');
  });

  // 5. TEST UPDATE INTERACTION
  it("/interactions/:id (PATCH) - Doit modifier le sujet de l'interaction", async () => {
    // On suppose que tu as stocké l'id de l'interaction dans une variable interactionId au test précédent
    const response = await request(app.getHttpServer())
      .patch(`/interactions/${interactionId}`) // Assure-toi d'avoir récupéré cet ID au test de création
      .set('Authorization', `Bearer ${authToken}`)
      .send({ sujet: 'Sujet Modifié par le Robot' });

    expect(response.status).toBe(200);
    expect(response.body.sujet).toBe('Sujet Modifié par le Robot');
  });

  afterAll(async () => {
    await app.close();
  });
});
