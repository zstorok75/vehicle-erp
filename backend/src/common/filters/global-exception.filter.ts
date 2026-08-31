import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('GlobalExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status: HttpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Loggolás
    const stackTrace =
      exception instanceof Error ? exception.stack : JSON.stringify(exception);

    this.logger.error(
      `[${request.method}] ${request.url} - Status: ${status}`,
      stackTrace,
    );

    // Frontendnek küldendő üzenet
    let message = 'Váratlan szerverhiba. Próbálja meg újra késöbb.';

    if (exception instanceof HttpException) {
      // Kontrollált kivételek
      // Validation.pipe, BadRequestException, NotFoundException
      const res = exception.getResponse();

      message =
        typeof res === 'object' && res !== null && 'message' in res
          ? ((res as { message: string | string[] })
              .message as unknown as string)
          : exception.message;
    } else if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      // Nem kezelt kivételek
      // Pl.: Adatbázis vagy Server összeomlás
      message = 'Adatbázis hiba miatt a művelet sikertelen!';
    }

    // Egységes válasz üzenet a Frontend felé
    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
      data: null,
    });
  }
}
