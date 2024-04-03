import { addTask, removeTask } from '@/actions/tasks';
import { useToast } from '@/components/ui/use-toast';
import { useOptimistic } from 'react';

export default function useOptimisticTaskCUD(tasks: string[]) {
  const [optimisticTasks, setOptimisticTasks] = useOptimistic<string[], { action: string; task: string }>(
    tasks,
    (state, { action, task }) => {
      switch (action) {
        case 'add':
          return [...state, task];
        case 'delete':
          return state.filter((item) => item !== task);
        default:
          return state;
      }
    }
  );
  const { toast } = useToast();

  const createTask = async (formData: FormData) => {
    const task = formData.get('task') as string;
    setOptimisticTasks({ action: 'add', task });
    const result = await addTask(formData);
    if (result?.error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: result.error,
      });
    }
  };

  const deleteTask = async (task: string) => {
    setOptimisticTasks({ action: 'delete', task });
    const result = await removeTask(task);
    if (result?.error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: result.error,
      });
    }
  };

  return { optimisticTasks, createTask, deleteTask };
}
