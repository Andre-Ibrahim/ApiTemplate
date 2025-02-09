import { IUser, User } from './Entities/User';

async function insertUser(user: IUser): Promise<void>{

    const newUser = new User(user);

    await newUser.save();
}

async function getUserByEmail(email: string): Promise<IUser | null> {

    const user: IUser | null = await User.findOne({ email });

    return user;
}

async function getAllUsers(): Promise<IUser[]> {

    const users: IUser[] = await User.find();

    if (users.length === 0) {
        return null;
    }

    return users;
}

export { insertUser, getUserByEmail, getAllUsers };