import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  let aiService: any;
  let repository: any;

  beforeEach(() => {
    aiService = {
      classificate: jest.fn(),
    };

    aiService.classificate.mockResolvedValue({
      importance: 'low',
      category: 'other',
    });

    repository = {
      countGroupBy: jest.fn(),
      insert: jest.fn(),
    };

    repository.countGroupBy.mockResolvedValue(1);
    repository.insert.mockResolvedValue(1);

    service = new TasksService(aiService, repository);
  });

  it('create task', async () => {
    const data = {
      name: 'test',
      description: 'A test task',
      userId: 1,
    };

    const result = await service.create(data);

    expect(result).toEqual({ id: 1 });
  });
});
