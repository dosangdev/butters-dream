import { debounce } from "lodash";
import { BOND_ABI, toNumber, wei } from "mint.club-v2-sdk";
import { useEffect, useState, useCallback, useMemo } from "react";
import { createPublicClient, fallback, http } from "viem";
import { base, mainnet } from "viem/chains";
import { useReadContract } from "wagmi";
import { BASE_BOND_CONTRACT_ADDRESS, BUTTER_TOKEN_ADDRESS } from "../constants";
// import { RPCS } from "../constants/rpcs";
import { useGlobalStore } from "../stores/global";

const BLOCK_PER_DAY = 43200;

// Create public client once outside component
const publicClient = createPublicClient({
  chain: base,
  transport: http(),
  //   fallback(
  //     RPCS[0].rpcs.map((rpc) => http(rpc)),
  //     {
  //       retryCount: 2,
  //       rank: false,
  //     }
  //   ),
});

// Separate hook for current price
function useGetPriceForNextMint({
  address,
  blockNumber,
}: {
  address: `0x${string}`;
  blockNumber?: number;
}) {
  return useReadContract({
    chainId: 8453,
    address: BASE_BOND_CONTRACT_ADDRESS,
    abi: BOND_ABI,
    functionName: "priceForNextMint",
    args: [address],
    ...(blockNumber && { blockNumber: BigInt(blockNumber) }),
  });
}

export function useGetPriceDiffRate({ address }: { address: `0x${string}` }) {
  const [currentBlock, setCurrentBlock] = useState<bigint | null>(null);
  const [oneDayAgoData, setOneDayAgoData] = useState<bigint | null>(null);
  //   const tokenTraded = useGlobalStore((state) => state.tokenTraded);

  // Current price data
  const {
    data: currentData,
    refetch: refetchCurrentData,
    isLoading: isLoadingCurrent,
  } = useGetPriceForNextMint({
    address,
  });

  // Historical price data
  const {
    data: historicalData,
    refetch: refetchHistoricalData,
    error: historicalError,
    isLoading: isLoadingHistorical,
  } = useGetPriceForNextMint({
    address,
    blockNumber: currentBlock
      ? Number(currentBlock) - BLOCK_PER_DAY
      : undefined,
  });

  const getCurrentBlockNumber = useCallback(async () => {
    try {
      const blockNumber = await publicClient.getBlockNumber();
      setCurrentBlock(blockNumber);
      return blockNumber;
    } catch (error) {
      console.error("Failed to get block number:", error);
      return null;
    }
  }, []);

  const updatePrices = useCallback(
    debounce(async () => {
      await getCurrentBlockNumber();
      await Promise.all([refetchCurrentData(), refetchHistoricalData()]);
    }, 1000),
    [getCurrentBlockNumber, refetchCurrentData, refetchHistoricalData]
  );

  // Initialize block number
  useEffect(() => {
    getCurrentBlockNumber();
  }, [getCurrentBlockNumber]);

  // Handle historical data errors
  useEffect(() => {
    if (historicalError) {
      console.warn(
        "Failed to fetch historical price, using fallback:",
        historicalError
      );
      setOneDayAgoData(wei(0.0001, 18));
    } else if (historicalData) {
      setOneDayAgoData(historicalData);
    }
  }, [historicalError, historicalData]);

  // Update prices on trade
  //   useEffect(() => {
  //     if (tokenTraded?.address === address) {
  //       updatePrices();

  //       const interval = setInterval(updatePrices, 10000);
  //       return () => {
  //         clearInterval(interval);
  //         updatePrices.cancel();
  //       };
  //     }
  //   }, [tokenTraded, address, updatePrices]);

  // Calculate price difference
  const priceDiffRate = useMemo(() => {
    if (!currentData || !oneDayAgoData) return null;

    const currentPrice = toNumber(currentData, 18);
    const historicalPrice = toNumber(oneDayAgoData, 18);
    console.log("historicalPrice : ", historicalPrice);

    if (historicalPrice === 0) return null;

    return ((currentPrice - historicalPrice) / historicalPrice) * 100;
    // return historicalPrice;
  }, [currentData, oneDayAgoData]);

  return {
    currentData,
    priceDiffRate,
    isLoading:
      isLoadingCurrent || isLoadingHistorical || !currentData || !oneDayAgoData,
  };
}
