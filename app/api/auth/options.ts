import prisma from "@/prisma";
import { getSlugFromName } from "@/utils/utils";
import type { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const user = await prisma.user.findUnique({
        where: { email: session?.user?.email },
      });

      if (user) {
        session.user = user;
      }

      return session;
    },
    async signIn({ user }: any) {
      try {
        const storedUser = await prisma.user.findUnique({
          where: { email: user?.email },
        });

        if (!storedUser && user) {
          await prisma.user.create({
            data: {
              email: user.email,
              slug: getSlugFromName(user.name),
              name: user.name,
              avatar: user.image,
            },
          });
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
