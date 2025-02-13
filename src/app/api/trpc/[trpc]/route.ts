import { createContext } from "@/trpc/context";
import { appRouter } from "@/trpc/router/_app";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: createContext,
    onError({ error }) {
      console.error('tRPC error:', error);
    },
  });
};

export { handler as GET, handler as POST };