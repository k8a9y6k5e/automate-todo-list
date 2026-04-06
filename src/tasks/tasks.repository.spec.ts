import { TasksRepository } from './tasks.repository';

describe('TasksRepository', () => {
  let repository: TasksRepository;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      countBy: jest.fn(),
    };

    mockRepository.save.mockResolvedValue({
      id: 1,
      name: 'test task',
      description: 'A test task',
    });
    mockRepository.countBy.mockResolvedValue(3);

    repository = new TasksRepository(mockRepository);
  });

  it('save the task', async () => {
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

  it('count how much specific value had', async () => {
    const result = await repository.countGroupBy('id', 1);

    expect(result).toBe(3);
  });
});
