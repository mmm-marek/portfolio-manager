import Link from "next/link";

const Home = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <h1>Index page</h1>
                <Link href="/dashboard">Link to Dashboard</Link>
            </div>
        </main>
    );
};

export default Home;
