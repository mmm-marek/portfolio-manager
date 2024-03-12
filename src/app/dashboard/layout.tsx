import { logout } from "@/services/auth/actions";
import { auth } from "@/services/auth/auth";
import Link from "next/link";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const data = await auth();

    return (
        <div className="flex gap-6 justify-start">
            <div className=" border-2 border-blue-400 p-10">
                <div>{data?.user?.name}</div>
                <Link href="/">Link to Index</Link>
                <form
                    action={async () => {
                        "use server";
                        await logout();
                    }}>
                    <button className="flex h-[48px] grow items-center justify-center text-black gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            </div>
            <div>{children}</div>
        </div>
    );
}
