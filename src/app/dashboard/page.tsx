import { logout } from "@/services/auth/actions";
import Link from "next/link";

const Dashboard = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <h1>Dashboard</h1>
                <Link href="/">Link to Index</Link>
                <form
                    action={async () => {
                        "use server";
                        await logout();
                    }}>
                    <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Dashboard;
