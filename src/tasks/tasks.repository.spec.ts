import { TasksRepository } from './tasks.repository';

describe('TasksRepository', () => {
  let repository: TasksRepository;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      countBy: jest.fn(),
      findOne: jest.fn(),
      findAndCount: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    mockRepository.save.mockResolvedValue({
      id: 1,
      name: 'test task',
      description: 'A test task',
    });

    mockRepository.countBy.mockResolvedValue(3);

    mockRepository.findOne.mockResolvedValue({
      id: 1,
      name: 'test task',
      description: 'task to test',
      category: 'other',
      importance: 'low',
      user: 1,
    });

    mockRepository.findAndCount.mockResolvedValue([
      {
        id: 1,
        name: 'test task',
        description: 'task to test',
        category: 'other',
        importance: 'low',
        user: 1,
      },
      1,
    ]);

    repository = new TasksRepository(mockRepository);
  });

  it('create query - tasks', async () => {
    const data = {
      name: 'test',
      description: 'a test task',
      category: 'test',
      importance: 'low',
      user: 1,
    };

    const result = await repository.insert(data);

    expect(result).toBe(1);
  });

  it('count groupe by query - tasks', async () => {
    const result = await repository.countGroupBy('id', 1);

    expect(result).toBe(3);
  });

  it('search query - tasks', async () => {
    const result = await repository.search(1);

    expect(result).toEqual({
      id: 1,
      name: 'test task',
      description: 'task to test',
      category: 'other',
      importance: 'low',
      user: 1,
    });
  });

  it('search query - exception test - tasks', async () => {
    mockRepository.findOne.mockResolvedValue(undefined);

    await expect(async () => await repository.search(1)).rejects.toThrow();
  });

  it('list query - tasks', async () => {
    const result = await repository.list(3, 1);

    expect(result).toEqual([
      {
        id: 1,
        name: 'test task',
        description: 'task to test',
        category: 'other',
        importance: 'low',
        user: 1,
      },
      1,
    ]);
  });

  it('delete query - tasks', async () => {
    const result = await repository.delete(1);

    expect(result).toBeUndefined();
  });

  it('update query - tasks', async () => {
    const result = await repository.update(1, 'name', 'test');

    expect(result).toBeUndefined();
  });
});
