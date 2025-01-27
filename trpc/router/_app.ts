import { createCallerFactory, mergeRouters, router } from "../trpc";
import publicProcedure from "../procedures/public-procedure";
import { createContext } from "../context";

export const helloRouter = router({
  sayHello: publicProcedure.query(({ ctx }) => {
    return { greeting: `Hello World!` };
  }),
});

export const appRouter = mergeRouters(helloRouter);

export const createCaller = createCallerFactory(appRouter, createContext);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;