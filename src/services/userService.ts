import { AuthorizeRequest } from "../controllers/models/AuthorizeRequest";
import { RegisterRequest, Role } from "../controllers/models/RegisterRequest";
import { User, IUser } from '../repositories/Entities/User';
import bcrypt from 'bcrypt';
import jwt, { Jwt } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { insertUser, getUserByEmail, getAllUsers } from '../repositories/userRepository';
import { UserResponse } from "../controllers/models/UserResponse";

dotenv.config();


async function createUser(user: RegisterRequest){

    console.log(user)

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser: IUser = await User.create({
        username: user.username,
        email: user.email,
        password: hashedPassword,
        role: Role.Admin
    });

    await insertUser(newUser);
}

async function authUser(user: AuthorizeRequest): Promise<string | null> {

    const storedUser = await getUserByEmail(user.email);

    if(storedUser == null){
        return null;
    }

    if(await bcrypt.compare(user.password, storedUser.password)){
        return await jwt.sign({email: storedUser.email, role: storedUser.role}, process.env.JWT_SECRET, { expiresIn: '1h'});
    }
    
    return null;
}

async function getUsers(): Promise<UserResponse[]> {
    const storedUsers: IUser[] = await getAllUsers();

    const users: UserResponse[] = storedUsers.map((u) => {
        return {
          id: u.id,
          username: u.username,
          email: u.email,
          role: u.role,
        };
      });

    return users;
}

export { createUser, authUser, getUsers };