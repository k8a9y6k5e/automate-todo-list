import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { IAIBody, IReturnAIBody } from './AI.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AiService {
  category = [
    'work',
    'personal',
    'health',
    'finance',
    'study',
    'home',
    'other',
  ];

  importance = ['low', 'medium', 'high', 'urgent'];

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async classificate(body: IAIBody): Promise<IReturnAIBody> {
    const response = await firstValueFrom(
      this.httpService.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'moonshotai/kimi-k2-instruct-0905',
          messages: [
            {
              role: 'system',
              content: `using the name and description of an activity, classify a importance level(${JSON.stringify(this.importance)}), and a category(${JSON.stringify(this.category)}) in format {category: value, importance: value}`,
            },
            {
              role: 'user',
              content: JSON.stringify(body),
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${this.configService.get('AI_KEY')}`,
          },
        },
      ),
    );

    return JSON.parse(
      response.data.choices[0].message.content,
    ) as IReturnAIBody;
  }
}
