import User from './model';
import * as userActions from './controller';
import type IUser from './user.types';
import type { IUserSchema } from './user.types';
import type { IUserPopulated } from '@/app/lib/common/types';

export default User;
export {
    userActions,
    IUser,
    IUserSchema,
    IUserPopulated
};
