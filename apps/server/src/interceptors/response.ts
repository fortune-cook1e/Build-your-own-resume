import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ResponseCode } from '../constants/index';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface CommonResponse<T> {
  code: ResponseCode;
  message?: string;
  data: T | null;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, CommonResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<CommonResponse<T>> | Promise<Observable<CommonResponse<T>>> {
    return next.handle().pipe(
      map((data) => this.responseHandler(data)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  responseHandler(data: T | null) {
    return {
      code: ResponseCode.Success,
      data,
    };
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    console.log('Response Exception Caught:', exception);
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Todo: 这里要区分 Invalid Credentials 情况
    response.status(status).json({
      code: ResponseCode.Error,
      message: exception.message || 'Request failed',
    });
  }
}
