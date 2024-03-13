"use client";

import { authenticate } from "@/services/auth/actions";
import { Button, Input } from "antd";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

const LoginForm = () => {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <form action={dispatch} className="max-w-96">
            <div className="flex flex-col flex-1 gap-3 px-6 pt-8 pb-4 bg-gray-800 rounded-lg">
                <h1 className={"text-2xl text-white"}>
                    Please log in to continue.
                </h1>
                <div className="flex flex-col w-full gap-3">
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
                    className="flex items-end h-8 space-x-1 "
                    aria-live="polite"
                    aria-atomic="true">
                    {errorMessage && (
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    )}
                </div>
            </div>
        </form>
    );
};

const LoginButton = () => {
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
};

export default LoginForm;
