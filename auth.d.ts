declare module "#auth-utils" {
  interface User {
    github?: string;
    gmail?: string;
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
