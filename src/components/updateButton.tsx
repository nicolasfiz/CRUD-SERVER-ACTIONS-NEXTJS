import { Pencil } from 'lucide-react';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from './ui/input';
import { useState } from 'react';
import { Task } from '@/interfaces/Task';

export default function UpdateButton({ task, updateFunction }: { task: Task; updateFunction: Function }) {
  const [newTask, setNewTask] = useState('');
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded-full" variant="secondary" size="icon">
          <Pencil />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form
          action={async (_) => {;
            await updateFunction(task, newTask);
            setNewTask("");
          }}
          className="flex flex-col gap-2"
        >
          <AlertDialogHeader className="gap-2">
            <AlertDialogTitle>Update task</AlertDialogTitle>
            <AlertDialogDescription>Insert new task name:</AlertDialogDescription>
            <Input className="p-4" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
