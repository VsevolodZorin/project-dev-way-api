import { SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';

export const Role =
  (...roles: string[]) =>
  (proto, propName, descriptor) => {
    UseGuards(RolesGuard)(proto, propName, descriptor);
    SetMetadata('roles', roles)(proto, propName, descriptor);
  };
