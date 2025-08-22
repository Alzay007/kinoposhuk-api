import mongoose, { Document, Schema } from 'mongoose';
import { IMovie } from './movie';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  ratedMovies: IMovie[];
  watchlist: string[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  ratedMovies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
  watchlist: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
