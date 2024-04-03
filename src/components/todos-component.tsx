'use client';

import { Input } from './ui/input';
import DataList from './dataList';
import { SubmitButton } from './submitButton';
import useOptimisticTaskCUD from '@/hooks/useTaskUpdater';

export default function TodosComponent({ tasks }: { tasks: string[] }) {
  const { optimisticTasks, createTask, deleteTask } = useOptimisticTaskCUD(tasks);

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
      <DataList tasks={optimisticTasks} deleteTask={deleteTask} />
    </>
  );
}
