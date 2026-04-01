import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: any;

  beforeAll(() => {
    jwtService = {
      sign: jest.fn(),
    };

    jwtService.sign.mockReturnValue('1a2b3c4d5');

    service = new AuthService(jwtService);
  });

  it('generate token', () => {
    const payload = {
      id: 1,
      email: 'test@example.com',
    };

    const result = service.login(payload);

    expect(result).toBe('1a2b3c4d5');
  });
});
