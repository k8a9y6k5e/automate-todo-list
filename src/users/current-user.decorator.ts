import { createParamDecorator } from '@nestjs/common';
import { IPayload } from '../auth/auth.interface';

export const CurrentUser = createParamDecorator((data, ctx) => {
  const request: { user: IPayload } = ctx.switchToHttp().getRequest();
  return request.user;
});
