import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { StatusCodes } from 'http-status-codes';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('create user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        name: 'test',
        email: 'test@example.com',
        password: '12345678',
      });

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('token');
  });

  it('exception of same email', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        name: 'test',
        email: 'test@example.com',
        password: '12345678',
      });

    expect(response.status).toBe(409);
  });
});
