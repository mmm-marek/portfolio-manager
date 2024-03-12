"use server";

import { createUser } from "@/database/repositories/userRepository";
import { createUserSchema } from "@/schemas/userSchemas";
import { formDataToObject } from "@/utils/formDataToObject";
import { AuthError } from "next-auth";
import { signIn, signOut } from "./auth";

export const logout = async () => {
    await signOut();
};

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
