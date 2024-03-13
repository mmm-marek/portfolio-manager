import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Portfolio Manager",
    description: "Test application for portfolio management",
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <AntdRegistry>{children}</AntdRegistry>
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;
