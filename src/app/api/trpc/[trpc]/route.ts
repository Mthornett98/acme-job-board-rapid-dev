import { auth } from "@/app/auth"; //Bringing in function called auth from /app/auth
import { type Session } from "@next-auth"; //Imports a session from next-auth, a library used for auth in Next.js

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