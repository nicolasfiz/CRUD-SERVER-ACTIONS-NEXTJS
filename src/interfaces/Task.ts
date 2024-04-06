import { ObjectId } from 'mongoose';

export interface Task {
  _id?: string;
  name: string;
}

export interface TaskDocument {
  _id: ObjectId;
  name: string
}