import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = { id: "42", name: "dave", password: "nextauth" };

        console.log("GitHub Provider - Client ID:", process.env.GITHUB_ID);
        console.log(
          "GitHub Provider - Client Secret:",
          process.env.GITHUB_SECRET
        );

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          console.log(
            "Credentials Provider - Authorized:",
            credentials?.username
          );
          return Promise.resolve(user);
        } else {
          console.log(
            "Credentials Provider - Not Authorized:",
            credentials?.username
          );
          return Promise.resolve(null);
        }
      },
    }),
  ],
};
