import { auth } from "@/app/auth"; //Bringing in function called auth from /app/auth
import { type Session } from "@next-auth"; //Imports a session from next-auth, a library used for auth in Next.js

export type Context = { //Creates a custom type called Context - essentially an object schema
  session: Session | null; //States that session can either be a Session object (if someone is logged in) or null if no one is logged in
  userID?: string; //States that userID is a string and is optional (?)
  role?: string; //States that the role is a string and is an optional property (due to ?)
}; 

export async function createContext(): Promise<Context> { //Defines async function, 'createContext', returns promise of the Context object
  const session = await auth(); //Calls auth function and waits to return a result, the result is stored in the session variable

  if (!session?.user) {  //If there is no user, session: null
    return { session: null };
  }

  return { //Else, return session, userID and role
    session, 
    userID: session.user.id,
    role: session.user.role,
  };
}