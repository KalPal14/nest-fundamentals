import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExeptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const exeptionStatus = exception.getStatus();
    const exeptionResponse = exception.getResponse();
    const error =
      typeof exeptionResponse === 'string'
        ? { message: exeptionResponse }
        : exeptionResponse;

    response
      .status(exeptionStatus)
      .json({ ...error, timestamp: new Date().toISOString() });
  }
}
