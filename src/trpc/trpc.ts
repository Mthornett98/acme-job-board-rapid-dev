// trpc/trpc.ts
import { auth } from "@/app/auth"; //Imports auth function for use in this file
import { TRPCError, initTRPC } from "@trpc/server"; //Imports both functions. TRPCError for error handling. initTRPC to define access to different routes.
import { Session } from "next-auth"; //Imports the Session object so we can see user details (ID, Role)

type Context = { //Creates a type called Context which contains the Session objectif the user is logged in, or null if no one is logged in
  session: Session | null;
};

const t = initTRPC.context<Context>().create(); //Creates tRPC instance that will be used to define API routes based off user Context
const middleware = t.middleware; //middleware is a helper function that allows us to add extra rules to certain API routes (e.g. check if a user is logged in)

//Middleware for authentication
const isAuth = t.middleware(({ ctx, next }) => {
  if (!ctx.userID) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx });
});

const isOptionalAuth = t.middleware(({ ctx, next }) => {
  return next({ ctx });
});

const isAdmin = t.middleware(({ ctx, next}) => {
  if (ctx.role !== 'ADMIN') {
    throw new TRPCError ({ code: 'FORBIDDEN'});
  }
  return next ({ ctx });
});

//Procedure builders
export const publicProcedure = t.procedure.use(isOptionalAuth);
export const privateProcedure = t.procedure.use(isAuth);
export const adminProcedure = t.procedure.use(isAuth).use(isAdmin);

export const router = t.router;
export const middleware = t.middleware; 
