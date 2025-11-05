import User from './model';
import * as userActions from './actions';
import type IUser from './user.types';
import type { IUserSchema, UserRole } from './user.types';
import type { IUserPopulated } from '@/src/lib/module/common/types';

export default User;
export {
    userActions,
    IUser,
    IUserSchema,
    IUserPopulated,
    UserRole
};
