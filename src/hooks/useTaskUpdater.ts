import { addTask, removeTask, updateTask } from '@/actions/tasks';
import { useToast } from '@/components/ui/use-toast';
import { useOptimistic } from 'react';

export default function useOptimisticTaskCUD(tasks: string[]) {
  const [optimisticTasks, setOptimisticTasks] = useOptimistic<
    string[],
    { action: string; task: string; newTask?: string }
  >(tasks, (state, { action, task, newTask }) => {
    switch (action) {
      case 'add':
        return [...state, task];
      case 'delete':
        return state.filter((item) => item !== task);
      case 'update':
        const copyState = [...state];
        copyState[copyState.indexOf(task)] = newTask as string;
        return copyState;
      default:
        return state;
    }
  });
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
      return result.error;
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

  const editTask = async (oldTask: string, newTask: string) => {
    setOptimisticTasks({ action: 'update', task: oldTask, newTask });
    const result = await updateTask(newTask, oldTask);
    if (result?.error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: result.error,
      });
    }
  }

  return { optimisticTasks, createTask, deleteTask, editTask };
}
