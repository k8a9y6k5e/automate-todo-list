import { UsersService } from './users.service';

describe('UserService', () => {
  let service: UsersService;
  let mockRepository: any;
  let authService: any;

  beforeAll(() => {
    mockRepository = {
      count: jest.fn(),
      insert: jest.fn(),
    };

    authService = {
      login: jest.fn(),
    };

    mockRepository.count.mockResolvedValue(0);
    mockRepository.insert.mockResolvedValue(1);
    authService.login.mockReturnValue('123abc');

    service = new UsersService(mockRepository, authService);
  });

  it('create user', async () => {
    const data = {
      name: 'test',
      email: 'test@example.com',
      password: '12345678',
    };

    const result = await service.create(data);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('token');
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
});
