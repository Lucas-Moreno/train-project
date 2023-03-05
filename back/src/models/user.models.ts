import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  isPasswordCorrect(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Unknown error occurred during password comparison');
  }
};


const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
