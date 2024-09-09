import { useAction } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";


export function GenerateToDoForm() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  
  const generateTodos = useAction(api.actions.generateTodos);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const todos = await generateTodos({ prompt });
      console.log(todos);
      setPrompt("");
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Generating Todos...</p>
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* <div className="flex flex-col gap-2"> */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h2 className="font-semibold text-lg">Generate Tasks with AI!</h2>
        <label className="text-sm font-semibold" htmlFor="prompt">Prompt</label>
        <input 
          className="p-1 border rounded"
          type="text" 
          name="prompt" 
          id="prompt" 
          value={prompt} 
          onChange={e => setPrompt(e.target.value)}
        />
        <button className="bg-blue-500 p-1 rounded text-white" type="submit">Create</button>
        {/* <button style={{ --tw-bg-opacity: 1; background-color: rgb(59 130 246 / var(--tw-bg-opacity)); padding: 0.25rem; border-radius: 0.25rem; --tw-text-opacity: 1; color: rgb(255 255 255 / var(--tw-text-opacity));  }} type="submit">Create</button> */}
      </div>
    </form>
  )
}