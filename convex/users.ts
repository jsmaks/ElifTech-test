import { query } from "./_generated/server";
// import { auth } from "./auth";
import { getAuthUserId } from "@convex-dev/auth/server";



export const current = query({
  args: {},
  handler: async (context) => {
    const userId = await getAuthUserId(context);
    if (userId === null) {
      return null;
    }
    return await context.db.get(userId);
  },
});