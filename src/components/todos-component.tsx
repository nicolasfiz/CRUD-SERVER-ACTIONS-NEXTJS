'use client';

import { Input } from './ui/input';
import DataList from './dataList';
import { addTask } from '@/api/tasks';
import { SubmitButton } from './submitButton';
import { useOptimistic } from 'react';

export default function TodosComponent({ tasks }: { tasks: string[] }) {
  const [optimisticTasks, addOptimisticTask] = useOptimistic<string[], string>(tasks, (state, newTask) => [...state, newTask]);
  const createTask = async (formData: FormData) => {
    const task = formData.get('task') as string
    addOptimisticTask(task)
    await addTask(formData);
  };
  return (
    <>
      <form className="flex flex-col items-center py-8" action={createTask}>
        <div className="w-9/12">
          <Input name="task" />
        </div>
        <div className="py-4">
          <SubmitButton text="Add to list" />
        </div>
      </form>
      <DataList data={optimisticTasks} />
    </>
  );
}
