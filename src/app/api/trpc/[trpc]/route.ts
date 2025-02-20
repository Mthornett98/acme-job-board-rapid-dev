import { appRouter } from "@/trpc"; // Imports main tRPC router function
import { createContext } from "@/trpc/context"; // Imports context function, including authentication and session data
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"; // Helper function from tRPC that processes HTTP requests

// Async function that takes a HTTP request as an argument, can GET or POST
const handler = async (req: Request) => 
    // Calls function which helps process HTTP requests and routes them through tRPC
    fetchRequestHandler({
        // Defines base endpoint for all tRPC API routes 
        endpoint: "/api/trpc",
        // Pass through the income request
        req,
        // Use main tRPC router
        router: appRouter,
        // Create context with session info
        createContext, 
        // Error handling middleware
        onError: ({ error, path }) => {
            console.error(`[tRPC] Error in ${path ?? "<no-path>"}:`, error );
        },
    });

// Exports the handler for GET and POST requests
export { handler as get, handler as POST};
       