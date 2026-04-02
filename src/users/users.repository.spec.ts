import { UsersRepository } from './users.repository';

describe('UserRepository', () => {
  let repository: UsersRepository;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      count: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };

    mockRepository.count.mockResolvedValue(1);
    mockRepository.findOne.mockResolvedValue({
      password_hash: '1234abcd',
      email: 'test@example.com',
      id: 1,
      name: 'test',
    });
    mockRepository.save.mockResolvedValue({
      id: 1,
      name: 'test',
      email: 'test@example.com',
    });

    repository = new UsersRepository(mockRepository);
  });

  it('count the value inside db', async () => {
    const result = await repository.count('email', 'test@example.com');

    expect(result).toBe(1);
  });

  it('create a row inside table', async () => {
    const userData = {
      name: 'test',
      email: 'test@example.com',
      password_hash: '1234abcd',
    };

    const result = await repository.insert(userData);

    expect(result).toBe(1);
  });

  it('search a value in table', async () => {
    const result = await repository.search('email', 'test@example.com');

    expect(result).toEqual({
      password_hash: '1234abcd',
      email: 'test@example.com',
      id: 1,
      name: 'test',
    });
  });
});
