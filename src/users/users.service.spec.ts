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
      hash: jest.fn(),
      genSalt: jest.fn(),
    };

    authService = {
      login: jest.fn(),
    };

    mockRepository.count.mockResolvedValue(0);
    mockRepository.insert.mockResolvedValue(1);
    mockRepository.search.mockResolvedValue({
      passwordHash: '1234abcd',
      email: 'test@example.com',
      id: 1,
      name: 'test',
    });
    mockRepository.hash.mockResolvedValue('a1b2c3d4');
    mockRepository.genSalt.mockResolvedValue(10);
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

  it('repeated email exception', async () => {
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

  it('log in the already existed user, but different password', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const data = { email: 'test@example.com', password: 'abc123' };

    await expect(async () => await service.logIn(data)).rejects.toThrow();
  });
});
