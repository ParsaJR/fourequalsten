import type mongoose from "mongoose";
import type { Mongoose, ObjectId } from "mongoose";

declare module "#auth-utils" {
  interface User {
    id?: any;
    github?: string;
    email?: string;
    name?: string;
    loggedInAt?: string;
  }
  interface UserSession {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extended?: any;
    loggedInAt?: date|number|string;
    user?: User;
  }
}
export {}
