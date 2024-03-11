"use server";

import { InsertUser, User, db } from "@/database/schema";

export const createUser = async ({
    name,
    email,
    password,
}: InsertUser): Promise<User | undefined> => {
    try {
        const user = await db
            .insertInto("user")
            .values({
                name,
                email,
                password,
            })
            .returningAll()
            .executeTakeFirst();
        return user;
    } catch (error) {
        console.error("Failed to create user", error);
        throw new Error("Failed to create user");
    }
};

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
