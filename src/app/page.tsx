import { getTasks } from "@/actions/tasks";
import TodosComponent from "@/components/todos-component";
import { Task } from "@/interfaces/Task";

export default async function Home() {
  const tasks: Task[] = await getTasks();

  return (
    <main className="text-center py-28 px-20">
      <h1 className="font-bold text-4xl">TO DO APP 📋</h1>
      <TodosComponent tasks={tasks}/>
    </main>
  );
}
