import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable
} from '@nestjs/common';

import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { id } = request.session || {};
    const user = await this.usersService.findOne({ id });

    if (user) request.currentUser = user;

    return next.handle();
  }
}
