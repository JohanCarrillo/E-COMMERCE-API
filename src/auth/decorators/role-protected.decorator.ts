import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../../utils/enums';

export const RoleProtected = (...args: UserRoles[]) =>
  SetMetadata('role-protected', args);
