"use client";

import { register } from "@/services/auth/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function RegisterForm() {
    const [errorMessage, dispatch] = useFormState(register, undefined);

    return (
        <form action={dispatch} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-800 px-6 pb-4 pt-8">
                <h1 className={"mb-3 text-2xl text-white"}>
                    Please register to continue.
                </h1>
                <div>
                    <label
                        className="mb-3 block text-xs font-medium text-white"
                        htmlFor="name">
                        Name
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-600 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-white"
                            htmlFor="email">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-600 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-white"
                            htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-600 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>
                </div>
                <RegisterButton />
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

function RegisterButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="mt-4 w-full bg-gray-700 text-white"
            aria-disabled={pending}>
            Register
        </button>
    );
}
