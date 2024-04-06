import { addTask, removeTask, updateTask } from '@/actions/tasks';
import { useToast } from '@/components/ui/use-toast';
import { Task } from '@/interfaces/Task';
import { useOptimistic } from 'react';

export default function useOptimisticTaskCUD(tasks: Task[]) {
  const [optimisticTasks, setOptimisticTasks] = useOptimistic<Task[], { action: string; task: Task; newTask?: Task }>(
    tasks,
    (state, { action, task, newTask }) => {
      switch (action) {
        case 'add':
          return [...state, task];
        case 'delete':
          return state.filter((item) => item.name !== task.name);
        case 'update':
          const copyState = [...state];
          copyState[copyState.indexOf(task)] = newTask as Task;
          return copyState;
        default:
          return state;
      }
    }
  );
  const { toast } = useToast();

  const createTask = async (formData: FormData) => {
    const taskName = formData.get('task') as string;
    const task = { name: taskName };
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

  const deleteTask = async (task: Task) => {
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

  const editTask = async (oldTask: Task, newTaskName: string) => {
    const newTask = { name: newTaskName };
    setOptimisticTasks({ action: 'update', task: oldTask, newTask });
    const result = await updateTask(newTask, oldTask);
    if (result?.error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: result.error,
      });
    }
  };

  return { optimisticTasks, createTask, deleteTask, editTask };
}
