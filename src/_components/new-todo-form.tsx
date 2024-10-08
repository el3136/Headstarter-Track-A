import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";


export function NewToDoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createTodo = useMutation(api.functions.createToDo);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTodo({ title, description });
    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* <div className="flex flex-col gap-2"> */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label className="text-sm font-semibold" htmlFor="title">Title</label>
        <input 
          className="p-1 border rounded"
          type="text" 
          name="title" 
          id="title" 
          value={title} 
          onChange={e => setTitle(e.target.value)}
        />
        <label className="text-sm font-semibold" htmlFor="description">Description</label>
        <input 
          className="p-1 border rounded"
          type="text" 
          name="description" 
          id="description" 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
        />
        <button className="bg-blue-500 p-1 rounded text-white" type="submit">Create</button>
        {/* <button style={{ --tw-bg-opacity: 1; background-color: rgb(59 130 246 / var(--tw-bg-opacity)); padding: 0.25rem; border-radius: 0.25rem; --tw-text-opacity: 1; color: rgb(255 255 255 / var(--tw-text-opacity));  }} type="submit">Create</button> */}
      </div>
    </form>
  )
}