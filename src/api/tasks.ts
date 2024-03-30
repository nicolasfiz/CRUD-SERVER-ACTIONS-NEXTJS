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
  console.log('Tasks loadaed');
  return data;
}

export async function addTask(formData: FormData) {
  await delay();
  const validatedFields = schema.safeParse({
    task: formData.get('task'),
  });
  if (!validatedFields.success) {
    return { error: 'Could not validate task'};
  }
  data.push(validatedFields.data.task);
  revalidatePath('/');
}
