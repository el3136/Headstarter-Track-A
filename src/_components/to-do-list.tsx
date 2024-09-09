import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export function ToDoList() {
  const todos = useQuery(api.functions.listToDos);

  return (
    <ul className="space-y-2">
      {todos?.map(({ _id, title, description, completed }, index) => (
        <ToDoItem 
          key={index}
          id={_id}
          title={title} 
          description={description} 
          completed={completed} 
        />
      ))}
    </ul>
  )
}

function ToDoItem({ id, title, description, completed }: {
  id: Id<"todos">;
  title: string;
  description: string; 
  completed: boolean;
}) {
  const updateTodo = useMutation(api.functions.updateTodo);
  const deleteTodo = useMutation(api.functions.deleteTodo);

  return (
    <li className="w-full flex items-center gap-2 border rounded p-2">
      <button type="button" className="text-red-500" onClick={() => deleteTodo({ id })}>Remove</button>
      <input 
        type="checkbox" 
        checked={completed} 
        onChange={e => updateTodo({ id, completed: e.target.checked })}
      />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </li>
  )
}
