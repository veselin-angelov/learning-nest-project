import { Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log(`${new Date()} - ${req.method} - ${req.url} - ${res.status}`);
    next();
  }
}

export function logger(req: Request, res: Response, next: NextFunction) {
  const logger = new Logger('Request Logger');

  res.on('finish', () => {
    logger.log(
      // eslint-disable-next-line prettier/prettier
      `${req.ip} - ${req.method} ${req.originalUrl} ${res.statusCode}`,
    );
  });

  next();
}
