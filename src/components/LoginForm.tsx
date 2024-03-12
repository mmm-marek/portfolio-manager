"use client";

import { authenticate } from "@/services/auth/actions";
import { Button, Input } from "antd";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form action={dispatch} className="max-w-96">
            <div className="flex-1 flex flex-col gap-3 rounded-lg bg-gray-800 px-6 pb-4 pt-8">
                <h1 className={"text-2xl text-white"}>
                    Please log in to continue.
                </h1>
                <div className="w-full flex flex-col gap-3">
                    <label
                        className="block text-xs font-medium text-white"
                        htmlFor="email">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        required
                    />
                    <label
                        className="block text-xs font-medium text-white"
                        htmlFor="password">
                        Password
                    </label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        required
                        minLength={6}
                    />
                </div>
                <LoginButton />
                <Link href="/register">
                    Don&apos;t have an account? Register here.
                </Link>
                <div
                    className="flex h-8 items-end space-x-1 text-red"
                    aria-live="polite"
                    aria-atomic="true">
                    {errorMessage && (
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    )}
                </div>
            </div>
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            htmlType="submit"
            size="large"
            className="w-fit"
            disabled={pending}>
            {pending ? "Logging in..." : "Log in"}
        </Button>
    );
}
