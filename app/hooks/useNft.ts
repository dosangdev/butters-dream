import { BUTTER_TOKEN_ADDRESS } from "@/constants";
import { mintclub, toNumber } from "mint.club-v2-sdk";
import { useEffect, useState } from "react";

export type NftDetail = {
  name: string;
  image: string;
  price: number;
  sold: number;
  maxSupply: number;
  address: `0x${string}`;
  reserveSymbol: string;
};

export default function useNft(address?: `0x${string}` | null) {
  const [data, setData] = useState<NftDetail | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      if (!address) {
        setData(null);
        return;
      }

      setLoading(true);
      // TODO: Mission 6: fetch NFT detail using sdk
      // https://sdk.mint.club/docs/sdk/network/nft/getDetail

      const ButterToken = await mintclub
        .network("base")
        .token(BUTTER_TOKEN_ADDRESS);
      console.log(ButterToken);

      // const nft = mintclub.network("base").nft(address);
      const {
        info: {
          name,
          token, //스마트 컨트랙트 주소
          priceForNextMint,
          currentSupply,
          maxSupply,
          reserveSymbol,
        },
        // info,
      } = await ButterToken.getDetail();

      const { logo: butterLogo } = await ButterToken.getMintClubMetadata();

      const qqq = await ButterToken.getDetail();

      console.log("qqq : ", qqq);

      // const imageHash = await nft.getImageUri().catch(() => "");
      // const imageUrl = mintclub.ipfs.hashToGatewayUrl(imageHash);

      setData({
        name,
        maxSupply: Number(maxSupply),
        image: butterLogo,
        price: toNumber(priceForNextMint, 18),
        sold: Number(currentSupply),
        address: token,
        reserveSymbol,
      });
      setLoading(false);
    } catch (e) {
      console.error(e);
      fetchData();
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return { data, refresh: fetchData, loading };
}
