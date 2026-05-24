/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";
import { getUserPermissions } from "./rbac";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const valid = await compare(credentials.password, user.password);
        if (!valid) return null;

        const permissions = await getUserPermissions(user.id);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          permissions,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt", // ✅ sekarang tidak error
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.permissions = (user as any).permissions;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as number;
      session.user.permissions = token.permissions as string[];
      return session;
    },
  },
};
