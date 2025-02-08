import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: Role;
}

const enum Role {
    Admin = "Admin",
    User = "User",
    Other = "Other"
}

const userSchema: Schema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, required: true}
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET ?? "", { expiresIn: "1h" });
};


const User = mongoose.model<IUser>('User', userSchema);
export { User, IUser };