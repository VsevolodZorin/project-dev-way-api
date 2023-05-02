import { SetMetadata, UseGuards } from '@nestjs/common';
import { RolesEnum } from '../types/role.enum';
import { RolesGuard } from '../guards/roles.guard';

export const Role = (role: RolesEnum) => (proto, propName, descriptor) => {
  UseGuards(RolesGuard)(proto, propName, descriptor);
  SetMetadata('role', role)(proto, propName, descriptor);
};
