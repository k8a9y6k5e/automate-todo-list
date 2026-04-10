import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { StatusCodes } from 'http-status-codes';

describe('UsersController - e2e', () => {
  let app: INestApplication<App>;
  let token: string;

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

  it('create user - exception test', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        name: 'test',
        email: 'test@example.com',
        password: '12345678',
      });

    expect(response.status).toBe(409);
  });

  it('login user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({
        email: 'test@example.com',
        password: '12345678',
      });

    token = `Bearer ${response.body.token}`;

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('token');
  });

  it('login user - exception test - incorrect password', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({
        email: 'test@example.com',
        password: '12345677',
      });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
  });

  it('login user - exception test - invalid email', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({
        email: 'tester@example.com',
        password: '12345678',
      });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });

  it('get user', async () => {
    const response = await request(app.getHttpServer())
      .get('/users/me')
      .set({ authorization: token });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('tasksCreated');
  });

  it('put update user', async () => {
    const response = await request(app.getHttpServer())
      .put('/users/me')
      .send({
        name: 'testUpdated',
        email: 'secondtest@example.com',
        password: '87654321',
      })
      .set({ authorization: token });

    expect(response.status).toBe(StatusCodes.NO_CONTENT);
  });

  it('patch update user', async () => {
    const response = await request(app.getHttpServer())
      .patch('/users/me')
      .send({
        name: 'test',
        email: 'test@example.com',
        password: '12345678',
      })
      .set({ authorization: token });

    expect(response.status).toBe(StatusCodes.NO_CONTENT);
  });

  it('patch update user - exception test', async () => {
    const response = await request(app.getHttpServer())
      .patch('/users/me')
      .send({})
      .set({ authorization: token });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('delete user', async () => {
    const response = await request(app.getHttpServer())
      .delete('/users/me')
      .set({ authorization: token });

    expect(response.status).toBe(StatusCodes.NO_CONTENT);
  });

  afterAll(async () => {
    await app.close();
  });
});
