import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  let aiService: any;
  let taskRepository: any;
  let userRepository: any;

  beforeEach(() => {
    aiService = {
      classificate: jest.fn(),
    };

    aiService.classificate.mockResolvedValue({
      importance: 'low',
      category: 'other',
    });

    taskRepository = {
      countGroupBy: jest.fn(),
      insert: jest.fn(),
      search: jest.fn(),
      list: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    taskRepository.countGroupBy.mockResolvedValue(1);

    taskRepository.insert.mockResolvedValue(1);

    taskRepository.search.mockResolvedValue({
      id: 1,
      name: 'test task',
      description: 'task to test',
      category: 'other',
      importance: 'low',
      user: 1,
    });

    taskRepository.list.mockResolvedValue([
      [
        {
          id: 1,
          name: 'test task',
          description: 'task to test',
          category: 'other',
          importance: 'low',
          user: 1,
        },
      ],
      1,
    ]);

    userRepository = {
      count: jest.fn(),
    };

    userRepository.count.mockResolvedValue(1);

    service = new TasksService(aiService, taskRepository, userRepository);
  });

  it('create task', async () => {
    const data = {
      name: 'test',
      description: 'A test task',
    };

    const result = await service.create(data, 1);

    expect(result).toEqual({ id: 1 });
  });

  it('create task - exception test', async () => {
    taskRepository.countGroupBy.mockResolvedValue(4);

    const data = {
      name: 'test',
      description: 'A test task',
    };

    await expect(async () => await service.create(data, 1)).rejects.toThrow();
  });

  it('search task', async () => {
    const result = await service.searchTask(1);

    expect(result).toEqual({
      id: 1,
      name: 'test task',
      description: 'task to test',
      category: 'other',
      importance: 'low',
      user: 1,
    });
  });

  it('list tasks', async () => {
    const result = await service.listTasks(1, 1);

    expect(result).toEqual({
      page: 1,
      take: 1,
      total: 1,
      data: [
        {
          id: 1,
          name: 'test task',
          description: 'task to test',
          category: 'other',
          importance: 'low',
          user: 1,
        },
      ],
    });
  });

  it('delete task', async () => {
    const result = await service.deleteTask(1);

    expect(result).toBeUndefined();
  });

  it('put update of a task', async () => {
    const data = {
      id: 1,
      name: 'test task',
      description: 'task to test',
      category: 'other',
      importance: 'low',
      user: 1,
    };

    const result = await service.putUpdateTask(1, data);

    expect(result).toBeUndefined();
  });

  it('put update of a task - exception test - not founded user', async () => {
    userRepository.count.mockResolvedValue(0);

    const data = {
      id: 1,
      name: 'test task',
      description: 'task to test',
      category: 'other',
      importance: 'low',
      user: 1,
    };

    await expect(
      async () => await service.putUpdateTask(1, data),
    ).rejects.toThrow();
  });

  it('put update of a task - exception test - task limit', async () => {
    taskRepository.countGroupBy.mockResolvedValue(4);

    const data = {
      id: 1,
      name: 'test task',
      description: 'task to test',
      category: 'other',
      importance: 'low',
      user: 1,
    };

    await expect(
      async () => await service.putUpdateTask(1, data),
    ).rejects.toThrow();
  });

  it('patch update of a task', async () => {
    const data = {
      id: 1,
      name: 'test task',
      description: 'task to test',
      category: 'other',
      importance: 'low',
      user: 1,
    };

    const result = await service.patchUpdateTask(1, data);

    expect(result).toBeUndefined();
  });

  it('patch update of a task - exception test - none value to update', async () => {
    await expect(
      async () => await service.patchUpdateTask(1, {}),
    ).rejects.toThrow();
  });
});
