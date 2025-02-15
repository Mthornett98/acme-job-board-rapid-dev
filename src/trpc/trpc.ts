// trpc/trpc.ts
import { auth } from "@/app/auth"; //Imports auth function for use in this file
import { TRPCError, initTRPC } from "@trpc/server"; //Imports both functions. TRPCError for error handling. initTRPC to define access to different routes.
import { Session } from "next-auth"; //Imports the Session object so we can see user details (ID, Role)

const t = initTRPC.context<Context>().create();

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
