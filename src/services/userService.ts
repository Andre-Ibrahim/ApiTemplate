import { AuthorizeRequest } from "../controllers/models/AuthorizeRequest";
import { RegisterRequest, Role } from "../controllers/models/RegisterRequest";
import { User, IUser } from '../repositories/Entities/User';
import bcrypt from 'bcrypt';
import jwt, { Jwt } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { insertUser, getUserByEmail } from '../repositories/userRepository'

dotenv.config();


async function createUser(user: RegisterRequest){

    console.log(user)

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    const newUser: IUser = await User.create({
        username: user.username,
        email: user.email,
        password: hashedPassword,
        role: Role.User
    });

    await insertUser(newUser);
}

async function authUser(user: AuthorizeRequest): Promise<string | null> {

    const storedUser = await getUserByEmail(user.email);

    console.log(storedUser);

    if(storedUser == null){
        return null;
    }

    if(await bcrypt.compare(user.password, storedUser.password)){
        return await jwt.sign({role: storedUser.role}, process.env.JWT_SECRET, { expiresIn: '1h'});
    }
    
    return null;
}

export { createUser, authUser };