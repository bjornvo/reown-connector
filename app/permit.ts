import { parseAbi } from "viem";
import { mainnet } from "viem/chains";

export const USDC_MAINNET = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" as const;
export const TOKEN_NAME = "USD Coin";
export const TOKEN_VERSION = "2";
export const USDC_DECIMALS = BigInt(6);

export const erc2612Abi = parseAbi([
  "function nonces(address) view returns (uint256)",
]);

export type PermitMessage = {
  owner: `0x${string}`;
  spender: `0x${string}`;
  value: bigint;
  nonce: bigint;
  deadline: bigint;
};

export const buildPermitDomain = (verifyingContract: `0x${string}`) => ({
  name: TOKEN_NAME,
  version: TOKEN_VERSION,
  chainId: mainnet.id,
  verifyingContract,
});

export const permitTypes = {
  Permit: [
    { name: "owner", type: "address" },
    { name: "spender", type: "address" },
    { name: "value", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
  ],
} as const;

export function splitSignature(sig: `0x${string}`) {
  // 65 bytes: r(32) + s(32) + v(1)
  const r = `0x${sig.slice(2, 66)}` as `0x${string}`;
  const s = `0x${sig.slice(66, 130)}` as `0x${string}`;
  const v = parseInt(sig.slice(130, 132), 16);
  return { v, r, s };
}
