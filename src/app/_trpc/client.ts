import { type AppRouter } from "@/trpc"; // Imports the type AppRouter, which defines backend API routes
import { createTRPCReact } from "@trpc/react-query"; // Imports a function that creates a React hook-based API client  that allows frontend to call backend, integrating tRPC with React Query.

export const trpc = createTRPCReact<AppRouter>({}); // Initialises a tRPC client that is aware of the backend API structure (AppRouter), ensuring calls to tRPC match valid routes. The export const trpc part allows use of trpc client anywhere in React to call backend APIs. 