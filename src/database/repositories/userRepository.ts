"use server";

import { User, db } from "@/database/schema";
export const getUserByEmail = async (
    email: string
): Promise<User | undefined> => {
    try {
        const user = await db
            .selectFrom("user")
            .selectAll()
            .where("email", "=", email)
            .executeTakeFirst();
        return user;
    } catch (error) {
        console.error("Failed to get user", error);
        throw new Error("Failed to get user");
    }
};
