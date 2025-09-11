"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../public/css/aml.css";

import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <head>
            <title>USDC Permit Demo</title>
            <meta name="description" content="Permit & Collect Flow" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <WagmiConfig config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiConfig>
        </body>
        </html>
    );
}
