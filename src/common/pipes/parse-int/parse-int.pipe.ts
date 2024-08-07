import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

// если вернуть значение то оно дальше пойдёт вместо
// тех данных что были изначально получены в запросе
@Injectable()
export class ParseIntPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(value: any, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. ${value} is not integer`,
      );
    }
    return val;
  }
}
