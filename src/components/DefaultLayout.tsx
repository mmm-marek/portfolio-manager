import { logout } from "@/services/auth/actions";
import { auth } from "@/services/auth/auth";
import { Button, Menu } from "antd";
import Link from "next/link";
import { Suspense } from "react";

const DefaultLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const data = await auth();

    if (!data?.user) {
        return <div>{children}</div>;
    }

    return (
        <div className="flex gap-6 justify-start">
            <Menu
                mode="inline"
                theme="dark"
                style={{ width: 256 }}
                className="h-screen"
                items={[
                    {
                        key: "0",
                        label: <div>{data?.user?.name}</div>,
                        disabled: true,
                    },
                    { key: "1", label: <Link href="/">Index</Link> },
                    {
                        key: "2",
                        label: <Link href="/dashboard">Dashboard</Link>,
                    },
                    {
                        key: "3",
                        label: (
                            <Link href="/stocks/simple-data-fetching">
                                Stocks - Simple Fetching
                            </Link>
                        ),
                    },
                    {
                        key: "4",
                        label: (
                            <form action={logout}>
                                <Button className="w-full" htmlType="submit">
                                    Sign Out
                                </Button>
                            </form>
                        ),
                    },
                ]}
            />
            <div>
                <Suspense fallback={<div>Default layout loading...</div>}>
                    {children}
                </Suspense>
            </div>
        </div>
    );
};

export default DefaultLayout;
