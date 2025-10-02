'use client'

import { wagmiAdapter, projectId } from "@/temp";
import { createAppKit } from "@reown/appkit"
import { mainnet } from "@reown/appkit/networks";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import {options} from "preact";

const queryClient = new QueryClient()

if (!projectId) {
    throw new Error('Project Id is not defined.')
}

const metadata = {
    name: "USDC Permit Demo",
    description: "Permit flow",
    url: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
    icons: ["https://avatars.githubusercontent.com/u/179229932"],
}

const modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [mainnet],
    defaultNetwork: mainnet,
    themeMode: 'light'
})

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}

export default ContextProvider