import { Task } from '@/interfaces/Task';
import { Schema, model, models } from 'mongoose';

const TaskSchema = new Schema<Task>({
  // _id: { type: Schema.ObjectId, required: true },
  name: { type: String, required: true },
});

export default models.Task || model('Task', TaskSchema);
