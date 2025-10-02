"use client";

import { cookieStorage, createStorage } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet } from "@reown/appkit/networks";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
    throw new Error("Project Id is not defined. Add NEXT_PUBLIC_PROJECT_ID to .env.local");
}

export const networks = [mainnet];

export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage,
    }),
    ssr: true,
    networks,
    projectId,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;