// trpc/context.ts
import { inferAsyncReturnType } from "@trpc/server"; // Correct import
import { getSession } from "next-auth/client"; // Adjust if using a different library or version

export const createContext = async () => {
  const session = await getSession(); // Ensure getSession is properly defined
  const ctx = {
    session,
  };

  return ctx;
};

// Use inferAsyncReturnType to define Context
export type Context = inferAsyncReturnType<typeof createContext>;