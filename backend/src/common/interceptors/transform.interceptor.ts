import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response as ExpressResponse } from 'express';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<ExpressResponse>();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      map((data) => {
        // Ha a controllertől visszakapott adatban van message
        const customMessage =
          typeof data === 'object' && data !== null && 'message' in data
            ? data.message
            : 'A művelet sikerült!';

        // Ha a controller már alapból a várt struktúrát adja vissza
        const actualData =
          typeof data === 'object' && data !== null && 'data' in data
            ? data.data
            : data;

        return {
          success: true,
          statusCode: response.statusCode,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: customMessage,
          data: actualData,
        };
      }),
    );
  }
}
