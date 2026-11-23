import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const started = Date.now();
    const request = context.switchToHttp().getRequest<{ method?: string; originalUrl?: string }>();

    return next.handle().pipe(
      tap(() => {
        console.log({
          method: request?.method,
          path: request?.originalUrl,
          durationMs: Date.now() - started,
        });
      }),
    );
  }
}