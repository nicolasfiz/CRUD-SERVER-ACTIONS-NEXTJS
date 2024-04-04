'use client';
import DeleteButton from './deleteButton';

export default function ListElement({ task, deleteFunction }: { task: string; deleteFunction: Function }) {
  return (
    <li className="pb-4">
      <div className="grid grid-cols-2 gap-x-4">
        <p className="flex flex-col justify-center">{task}</p>
        <DeleteButton deleteFunction={deleteFunction} task={task} />
      </div>
    </li>
  );
}
