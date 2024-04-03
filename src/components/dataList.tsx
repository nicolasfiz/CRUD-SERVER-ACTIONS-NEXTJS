'use client';
import ListElement from './listElement';

export default function DataList({ tasks, deleteTask }: { tasks: string[]; deleteTask: any }) {
  return (
    <div className="flex flex-col items-center">
      <ul className="list-disc">
        {tasks.map((t, index) => (
          <ListElement key={index} task={t} deleteFunction={deleteTask} />
        ))}
      </ul>
    </div>
  );
}
