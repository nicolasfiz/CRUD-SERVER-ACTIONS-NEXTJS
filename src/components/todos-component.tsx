'use client';

import { Input } from './ui/input';
import DataList from './dataList';
import { addTask } from '@/actions/tasks';
import { SubmitButton } from './submitButton';
import { useOptimistic } from 'react';
import { useToast } from './ui/use-toast';

export default function TodosComponent({ tasks }: { tasks: string[] }) {
  const [optimisticTasks, addOptimisticTask] = useOptimistic<string[], string>(tasks, (state, newTask) => [
    ...state,
    newTask,
  ]);
  const { toast } = useToast();

  const createTask = async (formData: FormData) => {
    const task = formData.get('task') as string;
    addOptimisticTask(task);
    const result = await addTask(formData);
    if (result?.error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: result.error,
      });
    }
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
