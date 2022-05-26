import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): Record<string, any>;
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> | Promise<any> {
    // before handler
    return next.handle().pipe(
      // after handler
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true
        });
      })
    );
  }
}
