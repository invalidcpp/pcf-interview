import mongoose from 'mongoose';
import { unzipSync } from 'zlib';
import { CreateUserOptions } from '../../../lib/types';
import Users, { User } from '../users.model';

const add = async ({ username, password, role }: CreateUserOptions): Promise<User | null> => {
  const session = await mongoose.startSession();
  await session.startTransaction();
  try {
    // TODO: Create a user
    const userExists: boolean = await Users.exists({ username: username });
    if (userExists) {
      throw { message: username };
    } else {
      const user: User = new Users({
        username: username,
        password: password,
        role: role,
      });
      await user.save();
      await session.commitTransaction();
      await session.endSession();
      return user;
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(`Failed to create user: User ${error.message} already exists`);
  }
};

export default add;
