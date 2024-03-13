import { logout } from "@/services/auth/actions";
import { auth } from "@/services/auth/auth";
import { Button, Menu } from "antd";
import Link from "next/link";

const DashboardLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const data = await auth();

    return (
        <div className="flex gap-6 justify-start">
            <Menu
                mode="inline"
                theme="dark"
                style={{ width: 256 }}
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
                            <form action={logout}>
                                <Button className="w-full" htmlType="submit">
                                    Sign Out
                                </Button>
                            </form>
                        ),
                    },
                ]}
            />
            <div>{children}</div>
        </div>
    );
};

export default DashboardLayout;
