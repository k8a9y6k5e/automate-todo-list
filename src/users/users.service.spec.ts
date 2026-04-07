import { UsersService } from './users.service';
jest.mock('bcrypt');
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let service: UsersService;
  let mockRepository: any;
  let authService: any;

  beforeAll(() => {
    mockRepository = {
      count: jest.fn(),
      insert: jest.fn(),
      search: jest.fn(),
      relationalCount: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    authService = {
      login: jest.fn(),
      genSalt: jest.fn(),
      hash: jest.fn(),
    };

    mockRepository.count.mockResolvedValue(0);
    mockRepository.insert.mockResolvedValue(1);
    mockRepository.search.mockResolvedValue({
      passwordHash: '1234abcd',
      email: 'test@example.com',
      id: 1,
      name: 'test',
    });
    mockRepository.relationalCount.mockResolvedValue(1);

    authService.hash.mockResolvedValue('a1b2c3d4');
    authService.genSalt.mockResolvedValue(10);
    authService.login.mockReturnValue('123abc');

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    service = new UsersService(mockRepository, authService);
  });

  it('create user', async () => {
    const data = {
      name: 'test',
      email: 'test@example.com',
      password: '12345678',
    };

    const result = await service.create(data);

    expect(result).toEqual({ id: 1, token: '123abc' });
  });

  it('create user - exception test', async () => {
    mockRepository.count.mockResolvedValue(1);

    const data = {
      name: 'test',
      email: 'test@example.com',
      password: '12345678',
    };

    await expect(async () => await service.create(data)).rejects.toThrow();
  });

  it('log in the already existed user', async () => {
    const data = { email: 'test@example.com', password: 'abc123' };

    const result = await service.logIn(data);

    expect(result).toEqual({ id: 1, token: '123abc' });
  });

  it('log in the already existed user - exception test', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const data = { email: 'test@example.com', password: 'abc123' };

    await expect(async () => await service.logIn(data)).rejects.toThrow();
  });

  it('get user informations', async () => {
    const result = await service.get(1);

    expect(result).toEqual({
      name: 'test',
      email: 'test@example.com',
      tasksCreated: 1,
    });
  });

  it('delete user', async () => {
    const result = await service.delete(1);

    expect(result).toBeUndefined();
  });

  it('user patch update', async () => {
    const data = {
      password: '12345678',
      name: 'tester',
    };

    const result = await service.patchUpdate(1, data);

    expect(result).toBeUndefined();
  });

  it('user patch update - exception test', async () => {
    await expect(
      async () => await service.patchUpdate(1, {}),
    ).rejects.toThrow();
  });

  it('user put update', async () => {
    const data = {
      name: 'test',
      email: 'test@example.com',
      password: '12345678',
    };

    const result = await service.putUpdate(1, data);

    expect(result).toBeUndefined();
  });
});
