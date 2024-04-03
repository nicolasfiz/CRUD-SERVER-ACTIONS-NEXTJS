'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const data: string[] = [];

const schema = z.object({
  task: z
    .string({
      invalid_type_error: 'Invalid task',
    })
    .refine((value) => value && value.length > 0, { message: 'Task should not be empty' }),
});

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 100));
}

export async function getTasks(): Promise<string[]> {
  await delay();
  console.log('Getting tasks...');
  return data;
}

export async function addTask(formData: FormData): Promise<void | { error: string }> {
  await delay();
  const task = formData.get('task') as string;
  const validatedFields = schema.safeParse({
    task,
  });
  if (!validatedFields.success) {
    return { error: 'Could not validate task' };
  }
  if (data.includes(task)) {
    return { error: 'Task already included' };
  }
  data.push(validatedFields.data.task);
  revalidatePath('/');
}

export async function removeTask(task: string): Promise<void | { error: string }> {
  await delay();
  if (!task || task.length === 0) {
    return { error: 'An error has ocurred' };
  }

  const index = data.indexOf(task);
  if (index === 0) {
    return { error: 'You cannot remove first task' };
  }
  if (index === -1) {
    return { error: 'Task not found' };
  }

  data.splice(index, 1);
  revalidatePath('/');
}
