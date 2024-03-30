import { getTasks } from "@/api/tasks";
import TodosComponent from "@/components/todos-component";

export default async function Home() {
  const tasks: string[] = await getTasks();

  return (
    <main className="text-center py-28 px-20">
      <h1 className="font-bold text-4xl">TO DO APP</h1>
      <TodosComponent tasks={tasks}/>
    </main>
  );
}
