// @ts-nocheck
"use client";

import { cookieStorage, createStorage, http } from "wagmi";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet } from "@reown/appkit/networks";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "434a5e6c707b6ce3e65fa8558724c314";

if (!projectId) {
    throw new Error("Project Id is not defined. Add NEXT_PUBLIC_PROJECT_ID to .env.local");
}

export const networks = [mainnet];

export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage,
    }),
    ssr: true,
    networks: networks.map(network => ({
        ...network,
        rpcUrls: {
            default: {
                http: ['https://eth.llamarpc.com']
            },
            public: {
                http: ['https://eth.llamarpc.com']
            }
        }
    })),
    projectId,
    // Force RPC configuration
    customRpcUrls: {
        default: {
            http: ['https://eth.llamarpc.com']
        },
        public: {
            http: ['https://eth.llamarpc.com']
        }
    }
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;