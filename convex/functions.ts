import { query } from "./_generated/server";

export const listToDos = query({
  handler: async (ctx) => {
    return await ctx.db.query("todos").collect();
  }
});