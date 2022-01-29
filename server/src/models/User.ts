import mongoose = require('mongoose');

export interface IUser {
  id: mongoose.ObjectId;
  name: string;
  email: string;
  password: string;
}

const userSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: 'users' }
);

export default mongoose.model<IUser>('User', userSchema);
