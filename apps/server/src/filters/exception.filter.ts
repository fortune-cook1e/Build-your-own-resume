import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { ResponseCode } from '../constants';

@Catch(HttpException)
// handle all exceptions include JWT
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    console.log('Exception Filter caught:', exception);

    response.status(status).json({
      code: ResponseCode.Error,
      data: null,
      message: exception.message,
    });
  }
}
