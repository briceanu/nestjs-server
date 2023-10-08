import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    try {
      return next.handle().pipe(
        map((data) => {
          if (data) {
            const { isEditing, todo, complete, id } = data;
            return { todo, isEditing, complete, id };
          } else {
            throw new NotFoundException('No data found in the database');
          }
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}
