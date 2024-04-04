'use client';

import { Input } from './ui/input';
import DataList from './dataList';
import { SubmitButton } from './submitButton';
import useOptimisticTaskCUD from '@/hooks/useTaskUpdater';
import { useState } from 'react';

export default function TodosComponent({ tasks }: { tasks: string[] }) {
  const { optimisticTasks, createTask, deleteTask } = useOptimisticTaskCUD(tasks);
  const [taskInput, setTaskInput] = useState('');

  const action = async (formData: FormData) => {
    const res = await createTask(formData);
    if (!res) {
      setTaskInput('');
    }
  };

  return (
    <>
      <form className="flex flex-col items-center py-8" action={action}>
        <div className="w-9/12">
          <Input name="task" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
        </div>
        <div className="py-4">
          <SubmitButton text="Add to list" />
        </div>
      </form>
      <DataList tasks={optimisticTasks} deleteTask={deleteTask} />
    </>
  );
}
