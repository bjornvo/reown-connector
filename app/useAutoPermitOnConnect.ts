"use client";

import { useEffect, useRef } from "react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { mainnet } from "viem/chains";

/**
 * Auto-start handlePermit immediately after successful connection.
 * Does not call again if user rejects — allow manual retry.
 */
export function useAutoPermitOnConnect(handlePermit: () => Promise<void>) {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const ran = useRef(false);

  useEffect(() => {
    (async () => {
      if (!isConnected) {
        ran.current = false;
        return;
      }
      if (ran.current) return;
      ran.current = true;

      try {
        if (chainId !== mainnet.id) {
          await switchChainAsync({ chainId: mainnet.id });
          await new Promise((r) => setTimeout(r, 150));
        }
        await handlePermit();
      } catch {
        // if user rejected — allow manual retry
        ran.current = false;
      }
    })();
  }, [isConnected, chainId, switchChainAsync, handlePermit]);
}
