import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Connection } from 'typeorm';

describe('Reports (e2e)', () => {
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

  const basicReport = {
    make: 'Skoda',
    model: 'Rapid',
    year: 2020,
    mileage: 0,
    price: 5000,
    lat: 90,
    lng: 180
  };

  const basicUser = {
    email: `test@test.com`,
    password: 'admin'
  };

  it('invalid to create new report without authorization', async () => {
    await request(app.getHttpServer())
      .post('/reports')
      .send(basicReport)
      .expect(403);
  });

  it('get reports', async () => {
    await request(app.getHttpServer()).get('/reports/qqq').expect(200);
  });

  it('create new report', async () => {
    // signup with authorization
    const authRes = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(basicUser)
      .expect(201);
    const { id, email, password } = authRes.body;
    expect(id).toBeDefined();
    expect(email).toEqual(basicUser.email);
    expect(password).not.toBeDefined();

    const userId = id;
    const cookie = authRes.get('Set-Cookie');

    // POST report
    await request(app.getHttpServer())
      .post('/reports')
      .set('Cookie', cookie)
      .send(basicReport)
      .expect(201)
      .then((res) => {
        const { id } = res.body;
        expect(id).toBeDefined();

        const report = Object.assign(basicReport, { id }, { userId });
        expect(report).toStrictEqual(res.body);
      });
  });
});
