import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

describe('TasksController - e2e', () => {
  let app: INestApplication<App>;
  let token: string;
  let id: number;
  const tasksIdsCreated: number[] = [];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    const response = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        name: 'task tester',
        email: 'tasktest@example.com',
        password: '12345678',
      });

    token = `Bearer ${response.body.token}`;
    id = response.body.id;
  });

  it('create task', async () => {
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send({
        name: 'test',
        description: 'test task',
      })
      .set({ authorization: token });

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body).toHaveProperty('id');

    tasksIdsCreated.push(response.body.id);
  });

  it('search task', async () => {
    const response = await request(app.getHttpServer())
      .get(`/tasks/${tasksIdsCreated[0]}`)
      .set({ authorization: token });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('category');
    expect(response.body).toHaveProperty('importance');
    expect(response.body).toHaveProperty('user');
  });
  it('search task - exception test - task not founded', async () => {
    const response = await request(app.getHttpServer())
      .get('/tasks/9999999')
      .set({ authorization: token });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });

  it('list tasks', async () => {
    const response = await request(app.getHttpServer())
      .get('/tasks')
      .set({ authorization: token })
      .query({ page: 1, take: 3 });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toHaveProperty('page');
    expect(response.body).toHaveProperty('take');
    expect(response.body).toHaveProperty('total');
    expect(response.body).toHaveProperty('data');
  });

  it('put update task', async () => {
    const response = await request(app.getHttpServer())
      .put(`/tasks/${tasksIdsCreated[0]}`)
      .send({
        name: 'test1',
        description: 'new test task',
        user: id,
        complete: true,
      })
      .set({ authorization: token });

    expect(response.status).toBe(StatusCodes.NO_CONTENT);
  });
  it('put update task - exception test - user not founded', async () => {
    const response = await request(app.getHttpServer())
      .put(`/tasks/${tasksIdsCreated[0]}`)
      .send({
        name: 'test1',
        description: 'new test task',
        user: 99999999,
        complete: true,
      })
      .set({ authorization: token });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });

  it('patch update task', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/tasks/${tasksIdsCreated[0]}`)
      .send({
        name: 'test1',
        description: 'new test task',
        user: id,
        complete: true,
      })
      .set({ authorization: token });

    expect(response.status).toBe(StatusCodes.NO_CONTENT);
  });
  it('patch update task - exception test - none value to update', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/tasks/${tasksIdsCreated[0]}`)
      .send({})
      .set({ authorization: token });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });
  it('patch update task - exception test - user not founded', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/tasks/${tasksIdsCreated[0]}`)
      .send({
        name: 'test1',
        description: 'new test task',
        user: 99999999,
        complete: true,
      })
      .set({ authorization: token });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });

  it('create task - exception test - user exceted tasks limit', async () => {
    let response = await request(app.getHttpServer())
      .post('/tasks')
      .send({
        name: 'test',
        description: 'test task',
      })
      .set({ authorization: token });

    //second task
    expect(response.status).toBe(StatusCodes.CREATED);
    tasksIdsCreated.push(response.body.id);

    response = await request(app.getHttpServer())
      .post('/tasks')
      .send({
        name: 'test',
        description: 'test task',
      })
      .set({ authorization: token });

    expect(response.status).toBe(StatusCodes.TOO_MANY_REQUESTS);
  });

  it('put update task - exception test - user exceding the limit of tasks', async () => {
    const response = await request(app.getHttpServer())
      .put(`/tasks/${tasksIdsCreated[0]}`)
      .send({
        name: 'test1',
        description: 'new test task',
        user: id,
        complete: true,
      })
      .set({ authorization: token });

    expect(response.status).toBe(StatusCodes.TOO_MANY_REQUESTS);
  });

  it('patch update task - exception test - user exceding the limit of tasks', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/tasks/${tasksIdsCreated[0]}`)
      .send({
        name: 'test1',
        description: 'new test task',
        user: id,
        complete: true,
      })
      .set({ authorization: token });

    expect(response.status).toBe(StatusCodes.TOO_MANY_REQUESTS);
  });

  it('delete tasks', async () => {
    for (const id of tasksIdsCreated) {
      const response = await request(app.getHttpServer())
        .delete(`/tasks/${id}`)
        .set({ authorization: token });

      expect(response.status).toBe(StatusCodes.NO_CONTENT);
    }
  });

  afterAll(async () => {
    const response = await request(app.getHttpServer())
      .delete('/users/me')
      .set({ authorization: token });
    expect(response.status).toBe(StatusCodes.NO_CONTENT);

    await app.close();
  });
});
