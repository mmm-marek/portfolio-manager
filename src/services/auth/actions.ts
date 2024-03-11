"use server";

import { createUser } from "@/database/repositories/userRepository";
import { AuthError } from "next-auth";
import { z } from "zod";
import { signIn, signOut } from "./auth";

export const logout = async () => {
    await signOut();
};

const formDataToObject = (formData: FormData) => {
    const object: Record<string, string> = {};
    formData.forEach((value, key) => {
        object[key] = value.toString();
    });
    return object;
};

const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export async function register(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        const parsedFormData = createUserSchema.safeParse(
            formDataToObject(formData)
        );
        if (!parsedFormData.success) {
            return parsedFormData.error.errors[0].message;
        }
        await createUser(parsedFormData.data);
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}
