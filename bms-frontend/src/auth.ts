import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import axios from "axios";
import { authEndpoints } from "./lib/api/auth/authEnpoints";

interface User {
  access_token: string;
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  markedDeleted: boolean;
  profilePhoto: string;
  updatedAt: string;
}

const login = async (credentials: any): Promise<any> => {
  try {
    return axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}${authEndpoints.login.post.url}`,
      credentials,
      {
        headers: {
          "User-Agent": "next-auth",
          "Content-Type": "application/json",
        }
      }
    ).then((res) => {
      return res.data;
    });
  } catch (err: any) {
    if (err?.response?.statusCode === 401) {
      throw new Error("Invalid credentials");
    } else {
      throw new Error("Something went wrong");
    }
  }
};

// million-ignore
export const config: NextAuthConfig = {
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const resp = await login(credentials);
        return resp;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

declare module "next-auth" {
  interface Session {
    expires: string;
    user: User;
    // accessToken?: string
  }
}
