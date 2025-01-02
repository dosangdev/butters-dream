import { BUTTER_TOKEN_ADDRESS } from "@/constants/index";
import useWallet from "@/hooks/useWallet";
import { useGlobalStore } from "@/stores/global";
import { mintclub, toNumber } from "mint.club-v2-sdk";
import { useEffect, useState } from "react";

export default function useProfile() {
  const { account } = useWallet();

  const [checking, setChecking] = useState(true);

  async function checkExistingProfile(account: `0x${string}`) {
    try {
      setChecking(true);
      const tokens = await mintclub.network("base").bond.getTokensByCreator({
        creator: account,
      });

      if (tokens.length > 0) {
        for (const token of tokens) {
          const exists = await mintclub.network("base").nft(token).exists();
          if (!exists) continue;

          const reserveToken = await mintclub
            .network("base")
            .nft(token)
            .getReserveToken()
            .catch();

          if (reserveToken?.address === BUTTER_TOKEN_ADDRESS) {
            const nft = mintclub.network("base").nft(token);
            const priceForNextMint = await nft.getPriceForNextMint();
            useGlobalStore.setState({
              myPrice: toNumber(priceForNextMint, 18),
            });
            break;
          }
        }
      } else {
        useGlobalStore.setState({ myPrice: undefined });
      }
    } catch (e) {
      console.error(e);
      checkExistingProfile(account);
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    if (account) {
      setChecking(true);
      checkExistingProfile(account);
    } else {
      setChecking(false);
      useGlobalStore.setState({ myPrice: undefined });
    }

    // eslint-disable-next-line
  }, [account]);

  return {
    checkingProfile: checking,
  };
}
