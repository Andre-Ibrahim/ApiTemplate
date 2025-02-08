import { IUser, User } from './Entities/User';

async function insertUser(user: IUser): Promise<void>{

    const newUser = new User(user);

    await newUser.save();
}

async function getUserByEmail(email: string): Promise<IUser | null> {

    const user: IUser | null = await User.findOne({ email });

    return user;
}

export { insertUser, getUserByEmail };