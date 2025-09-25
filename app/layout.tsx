"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../public/css/aml.css";
import ContextProvider from "@/context";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

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
        <ContextProvider cookies={null}>
            {children}
        </ContextProvider>
        </body>
        </html>
    );
}