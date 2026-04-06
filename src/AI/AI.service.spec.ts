import { of } from 'rxjs';
import { AiService } from './AI.service';

describe('AiService', () => {
  let service: AiService;
  let httpService: any;
  let configService: any;

  beforeEach(() => {
    httpService = {
      post: jest.fn(),
    };

    httpService.post.mockReturnValue(
      of({
        data: {
          choices: [
            {
              message: {
                content: '{ "category": "other","importance": "low" }',
              },
            },
          ],
        },
      }),
    );

    configService = {
      get: jest.fn(),
    };

    configService.get.mockReturnValue('1ab2c3d4e5');

    service = new AiService(httpService, configService);
  });

  it('AI call', async () => {
    const response = await service.classificate({
      name: 'test',
      description: 'test of code',
    });

    expect(response).toEqual({
      category: 'other',
      importance: 'low',
    });
  });
});
