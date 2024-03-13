"use client";

import { register } from "@/services/auth/actions";
import { Button, Input } from "antd";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

const RegisterForm = () => {
    const [errorMessage, dispatch] = useFormState(register, undefined);

    return (
        <form action={dispatch} className="max-w-96">
            <div className="flex-1 flex flex-col gap-3 rounded-lg bg-gray-800 px-6 pb-4 pt-8">
                <h1 className={"text-2xl text-white"}>
                    Please register to continue.
                </h1>
                <div className="w-full flex flex-col gap-3">
                    <label
                        className="block text-xs font-medium text-white"
                        htmlFor="name">
                        Name
                    </label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        required
                    />
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
                <RegisterButton />
                <Link href="/login">Already have an account? Log in here.</Link>
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
};

const RegisterButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button className="w-fit" htmlType="submit" disabled={pending}>
            Register
        </Button>
    );
};

export default RegisterForm;
