import Link from "next/link";

const Dashboard = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <h1>Dashboard</h1>
                <Link href="/">Link to Index</Link>
            </div>
        </main>
    );
};

export default Dashboard;
