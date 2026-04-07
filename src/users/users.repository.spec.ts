import { UsersRepository } from './users.repository';

describe('UserRepository', () => {
  let repository: UsersRepository;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      count: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    mockRepository.count.mockResolvedValue(1);
    mockRepository.findOne.mockResolvedValue({
      passwordHash: '1234abcd',
      email: 'test@example.com',
      id: 1,
      name: 'test',
      tasks: ['task1', 'task2'],
    });
    mockRepository.save.mockResolvedValue({
      id: 1,
      name: 'test',
      email: 'test@example.com',
    });

    repository = new UsersRepository(mockRepository);
  });

  it('count query - user', async () => {
    const result = await repository.count('email', 'test@example.com');

    expect(result).toBe(1);
  });

  it('save query - user', async () => {
    const userData = {
      name: 'test',
      email: 'test@example.com',
      passwordHash: '1234abcd',
    };

    const result = await repository.insert(userData);

    expect(result).toBe(1);
  });

  it('search query - user', async () => {
    const result = await repository.search('email', 'test@example.com');

    expect(result).toEqual({
      passwordHash: '1234abcd',
      email: 'test@example.com',
      id: 1,
      name: 'test',
      tasks: ['task1', 'task2'],
    });
  });

  it('relational query - user', async () => {
    const result = await repository.relationalCount('id', 1, 'tasks');

    expect(result).toBe(2);
  });

  it('relational query - exception test - user', async () => {
    mockRepository.findOne.mockResolvedValue(undefined);

    await expect(
      async () => await repository.relationalCount('id', 1, 'tasks'),
    ).rejects.toThrow();
  });

  it('delete query - user', async () => {
    const result = await repository.delete(1);

    expect(result).toBeUndefined();
  });

  it('update query - user', async () => {
    const result = await repository.update(1, 'name', 'test');

    expect(result).toBeUndefined();
  });
});
