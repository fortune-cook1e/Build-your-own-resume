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
import { ZodValidationException } from 'nestjs-zod';

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

  errorHandler(
    exception: HttpException | ZodValidationException,
    context: ExecutionContext,
  ) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    console.log('Response Interceptor ErrorHandler Caught:', exception);

    const isHttpException = exception instanceof HttpException;
    const isZodValidtionPipeError = exception instanceof ZodValidationException;

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.BAD_REQUEST;

    const message = isZodValidtionPipeError
      ? exception.getZodError().errors[0].message
      : exception.message;

    // Todo: 这里要区分 Invalid Credentials 情况
    response.status(status).json({
      code: ResponseCode.Error,
      data: null,
      message: message || 'Request failed',
    });
  }
}
