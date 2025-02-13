// trpc/trpc.ts
import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

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
