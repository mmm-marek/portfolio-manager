import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUserByEmail } from "./database/repositories/userRepository";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL("/dashboard", nextUrl));
            }
            return true;
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    // Might be implemented by a call to an external service instead of connecting to database
                    // const res = await fetch("/your/endpoint", {
                    //     method: 'POST',
                    //     body: JSON.stringify(credentials),
                    //     headers: { "Content-Type": "application/json" }
                    //   })
                    // const user = await res.json()

                    const user = await getUserByEmail(email);
                    if (!user) return null;

                    const passwordsMatch = password === user.password;

                    if (passwordsMatch) {
                        return user;
                    }
                }

                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(authConfig);
