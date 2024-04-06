'use server';
import { Types } from 'mongoose';
import dbConnect from '@/lib/db/mongoDBConnection';
import tasks from '@/models/tasks';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Task, TaskDocument } from '@/interfaces/Task';

const taskSchema = z.object({
  taskName: z
    .string({
      invalid_type_error: 'Invalid task',
    })
    .refine((value) => value && value.length > 0),
});

export async function getTasks(): Promise<Task[]> {
  await dbConnect();
  const allTasks: TaskDocument[] = await tasks.find();
  console.log('Getting tasks...');
  return allTasks.map((t) => ({ _id: t._id.toString(), name: t.name }));
}

export async function addTask(formData: FormData): Promise<void | { error: string }> {
  await dbConnect();
  const taskName = formData.get('task') as string;
  const validatedFields = taskSchema.safeParse({
    taskName,
  });
  if (!validatedFields.success) {
    return { error: 'Could not validate task' };
  }

  const tasksList: TaskDocument[] | null = await tasks.findOne({ name: taskName });
  if (tasksList !== null) {
    return { error: 'Task already included' };
  }
  await tasks.create({ name: taskName });
  revalidatePath('/');
}

export async function removeTask(task: Task): Promise<void | { error: string }> {
  await dbConnect();
  if (!task || task.name.length === 0) {
    return { error: 'An error has ocurred' };
  }

  const allTasks: TaskDocument[] = await tasks.find();
  const findedTask = allTasks.find((t) => t._id.toString() === task._id);
  if (!findedTask) {
    return { error: 'Task not found' };
  }
  if (allTasks[0]._id === findedTask._id) {
    return { error: 'You cannot remove first task' };
  }

  await tasks.deleteOne({ _id: new Types.ObjectId(task._id) });
  revalidatePath('/');
}

export async function updateTask(newTask: Task, oldTask: Task): Promise<void | { error: string }> {
  await dbConnect();

  const allTasks: Task[] = await tasks.find();

  if (allTasks.includes(newTask)) {
    return { error: 'Task already included' };
  }

  const findedTask = allTasks.find((t) => t._id?.toString() === oldTask._id);

  if (findedTask === null) {
    return { error: 'Task not found' };
  }
  if (findedTask?._id === allTasks[allTasks.length - 1]._id) {
    return { error: ' Last task cannot be changed' };
  }

  await tasks.updateOne({ _id: new Types.ObjectId(oldTask._id) }, newTask);
  revalidatePath('/');
}
