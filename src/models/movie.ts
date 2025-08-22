import mongoose, { Document, Schema } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  genre: string;
  releaseYear: number;
  description: string;
  directors: string[];
  actors: string[];
  budget: number;
  boxOffice: number;
  imdbRating: number;
  siteRating: number;
  country: string;
  duration: number;
  poster?: string;
}

const MovieSchema: Schema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  description: { type: String, required: true },
  directors: [{ type: String, required: true }],
  actors: [{ type: String, required: true }],
  budget: { type: Number, default: 0 },
  boxOffice: { type: Number, default: 0 },
  imdbRating: { type: Number, default: 0 },
  siteRating: { type: Number, default: 0 },
  country: { type: String, required: true },
  duration: { type: Number, required: true },
  poster: { type: String },
});

const MovieModel = mongoose.model<IMovie>('Movie', MovieSchema);

export default MovieModel;
