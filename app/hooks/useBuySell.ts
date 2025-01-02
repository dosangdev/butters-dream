import { useDebounce } from "@uidotdev/usehooks";
import { ERC20_ABI, mintclub, toNumber, wei } from "mint.club-v2-sdk";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { sendTransaction, simulateContract } from "viem/actions";
import { config } from "../../config";
import { useAccount, useWalletClient, useWriteContract } from "wagmi";
import { base } from "viem/chains";

export default function useBuySell(
  tradeType: "buy" | "sell" | null,
  tokenAddress: `0x${string}`,
  amount: number
) {
  const [loading, setLoading] = useState(false);
  const [estimating, setEstimating] = useState(false);
  const [estimation, setEstimation] = useState(0);
  const debounced = useDebounce(amount, 500);
  const { writeContract } = useWriteContract();
  const { address } = useAccount();

  const { data: walletClient } = useWalletClient({
    account: address,
    chainId: base.id,
  });

  async function estimate() {
    try {
      setEstimating(true);
      const token = mintclub.network("base").token(tokenAddress);

      let estimation: bigint;

      if (tradeType === "buy") {
        [estimation] = await token.getBuyEstimation(BigInt(amount));
      } else {
        [estimation] = await token.getSellEstimation(BigInt(amount));
      }

      setEstimation(toNumber(estimation, 18));
    } finally {
      setEstimating(false);
    }
  }

  useEffect(() => {
    if (tradeType === null) {
      setEstimation(0);
      setEstimating(false);
      setLoading(false);
    }

    if (
      tradeType !== null &&
      tokenAddress &&
      amount !== 0 &&
      amount !== undefined &&
      debounced === amount
    ) {
      estimate();
    }
    // eslint-disable-next-line
  }, [amount, debounced, tradeType, tokenAddress]);

  async function buy(onSuccess: () => void) {
    try {
      setLoading(true);
      // TODO: Mission 7: buy nft using sdk
      // https://sdk.mint.club/docs/sdk/network/nft/buy
      await mintclub
        .withWalletClient({
          ...walletClient,
          chain: base,
        } as any)
        .network("base")
        .token(tokenAddress)
        .buy({
          amount: wei(amount),
          onAllowanceSignatureRequest: () => {
            toast("🔓 컨트랙트의 토큰사용을 허용해주세요");
          },
          onAllowanceSuccess: () => {
            toast.success("허용되었습니다");
          },
          onSignatureRequest: () => {
            toast("🖊️ 트랜잭션을 승인해주세요");
          },
          onSigned: () => {
            toast.success("🚀 트랜잭션이 성공적으로 전송되었습니다");
          },
          debug: (e) => {
            console.log(e);
          },
          onSuccess: async () => {
            const txHash = await writeContract({
              chainId: 8453,
              address: tokenAddress,
              abi: ERC20_ABI,
              functionName: "transfer",
              args: [
                "0xc683F61BFE08bfcCde53A41f4607B4A1B72954Db",
                wei(amount, 18),
              ],
            });
            console.log(txHash);
          },
          onError: (e: any) => {
            console.error(e);
            toast.error("구매에 실패했습니다. 콘솔을 확인해주세요");
          },
        });
      // const { request } = await simulateContract(config, {
      //   chainId: 8453,
      //   address: tokenAddress,
      //   abi: ERC20_ABI,
      //   functionName: 'transfer',
      //   args: ["0xc683F61BFE08bfcCde53A41f4607B4A1B72954Db", wei(amount, 18)],
      // });

      //   // 트랜잭션 실행
      //   // 트랜잭션 실행
      // const txHash = await sendTransaction(config, request);
      // const txHash = writeContract({
      //   chainId: 8453,
      //   address: tokenAddress,
      //   abi: ERC20_ABI,
      //   functionName: "transfer",
      //   args: ["0xc683F61BFE08bfcCde53A41f4607B4A1B72954Db", wei(amount, 18)],
      // });

      // toast.success(토큰이 전송되었습니다. Tx Hash: ${txHash});
      // console.log("Transaction Hash:", txHash);

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("토큰 전송에 실패했습니다. 콘솔을 확인해주세요.");
    } finally {
      setLoading(false);
    }
  }

  async function sell(onSuccess: () => void) {
    try {
      setLoading(true);
      // TODO: Mission 8: sell token using sdk
      // https://sdk.mint.club/docs/sdk/network/token/sell

      await mintclub
        .network("base")
        .token(tokenAddress)
        .sell({
          amount: BigInt(amount),
          onAllowanceSignatureRequest: () => {
            toast("🔓 컨트랙트의 토큰사용을 허용해주세요");
          },
          onAllowanceSuccess: () => {
            toast.success("허용되었습니다");
          },
          onSignatureRequest: () => {
            toast("🖊️ 트랜잭션을 승인해주세요");
          },
          onSigned: () => {
            toast.success("🚀 트랜잭션이 성공적으로 전송되었습니다");
          },
          debug: (e) => {
            console.log(e);
          },
          onSuccess,
          onError: (e: any) => {
            console.error(e);
            toast.error("구매에 실패했습니다. 콘솔을 확인해주세요");
          },
        });
    } finally {
      setLoading(false);
    }
  }

  return {
    buy,
    sell,
    estimation,
    estimating: estimating || debounced !== amount,
    txLoading: loading,
  };
}
