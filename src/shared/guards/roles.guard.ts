import { CanActivate, Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RolesEnum } from '../types/role.enum';
import { IJwtPayload } from 'src/services/jwt/types/jwt-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = this.reflector.get<RolesEnum>('role', context.getHandler());

    const user = request.user as IJwtPayload;
    const hasRole = () => {
      return user.role.toString() === role.toString();
    };

    return user && user.role && hasRole();
  }
}
