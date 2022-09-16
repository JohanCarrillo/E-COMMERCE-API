import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { UserRoles } from 'src/utils/enums';
import { UserRoleGuard } from '../guards/user-role.guard';

export function Auth(...roles: UserRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
