import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      permissions: string[];
      name?: string;
      email?: string;
    };
  }

  interface User {
    id: number;
    permissions: string[];
  }
}
