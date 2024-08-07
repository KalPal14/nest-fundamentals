import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Protocol = createParamDecorator(
  (defaultProtocol: string, ctx: ExecutionContext) => {
    console.log({ defaultProtocol });
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.protocol;
  },
);
