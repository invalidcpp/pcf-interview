import mongoose, { Document, Schema } from 'mongoose';
import LocationModel, { LocationLean } from '../locations/location.model';
import UserModel, { UserLean } from '../users/users.model';

export interface BookLean {
  title: string;
  author: string;
  ISBN: string;
  CheckedOut: boolean;
  Location: LocationLean;
  User?: UserLean;
}

export interface Book extends BookLean, Document {}

const BookSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    Author: {
      type: String,
      required: true,
      trim: true,
    },
    ISBN: {
      type: String,
      trim: true,
      required: true,
    },
    CheckedOut: {
      type: Boolean,
      required: true,
      default: false,
    },
    Location: [LocationModel.schema],
    User: [UserModel.schema],
  },
  { timestamps: true },
);

const model = mongoose.model('Book', BookSchema);
export default model;
