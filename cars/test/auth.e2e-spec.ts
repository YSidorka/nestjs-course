import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Connection } from 'typeorm';

describe('Authentication (e2e)', () => {
  let app: INestApplication;
  let connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    connection = moduleFixture.get(Connection);
    await app.init();
  });

  afterEach(async () => {
    if (connection) await connection.close();
  });

  const EMAIL = `test@test.com`;

  it('handles a signup request', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: EMAIL, password: 'admin' })
      .expect(201)

      .then((res) => {
        const { id, email, password } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(EMAIL);
        expect(password).not.toBeDefined();
      });
  });

  it('get user after signup process', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: EMAIL, password: 'admin' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    await request(app.getHttpServer())
      .get('/auth/user')
      .set('Cookie', cookie)
      .expect(200)
      .then((res) => {
        const { id, email, password } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(EMAIL);
        expect(password).not.toBeDefined();
      });
  });
});
