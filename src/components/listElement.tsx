'use client';
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

import { CircleX } from 'lucide-react';

export default function ListElement({ task, deleteFunction }: { task: string; deleteFunction: any }) {
  return (
    <li className="pb-4">
      <div className="grid grid-cols-2 gap-x-4">
        <p>{task}</p>
        <form
          action={async () => {
            await deleteFunction(task);
          }}
        >
          <Button type="submit">Del</Button>
        </form>
        {/* <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className='rounded-full' variant='destructive' size='icon'><CircleX /></Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteFunction(task)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
      </div>
    </li>
  );
}
