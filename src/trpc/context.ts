// trpc/context.ts
import { inferAsyncReturnType } from "@trpc/server"; // Correct import
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getSession } from "next-auth"; // Adjust if using a different library or version
import { authOptions } from '../auth'; //Adjust import based on auth setup

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = await getSession(req, res. authOptions); // Ensure getSession is properly defined

  return {
    session,
    userID: session?.user?.id ?? null,
    role: session?.user?.role ?? 'USER', //Default role if none is assigned 
  };
};

// Use inferAsyncReturnType to define Context
export type Context = inferAsyncReturnType<typeof createContext>;