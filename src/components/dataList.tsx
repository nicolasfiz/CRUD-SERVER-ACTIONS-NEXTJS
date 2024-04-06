'use client';
import { Task } from '@/interfaces/Task';
import ListElement from './listElement';

export default function DataList({
  tasks,
  deleteTask,
  editTask,
}: {
  tasks: Task[];
  deleteTask: Function;
  editTask: Function;
}) {
  return (
    <div className="flex flex-col items-center">
      <ul className="list-disc">
        {tasks.map((t, index) => (
          <ListElement key={index} task={t} deleteFunction={deleteTask} updateFunction={editTask} />
        ))}
      </ul>
    </div>
  );
}
