import { BUTTER_TOKEN_ADDRESS } from "@/constants/index";
import { useGlobalStore } from "@/stores/global";
import { mintclub } from "mint.club-v2-sdk";
import { useEffect } from "react";

export default function useNftList() {
  const token = useGlobalStore((state) => state.token);
  async function fetchList() {
    try {
      // useGlobalStore.setState({ token });
      // const token = await mintclub
      //   .network("base")
      //   .bond.getTokensByReserveToken({
      //     reserveToken: BUTTER_TOKEN_ADDRESS,
      //     start: 17000,
      //     end: 20000,
      //   });
      // const baseNetwork = await mintclub
      //   .network("base")
      //   .token(BUTTER_TOKEN_ADDRESS);
      // console.log("baseNetwork : ", baseNetwork);
    } catch (e) {
      console.error(e);
      fetchList();
    }
  }

  useEffect(() => {
    fetchList();

    // eslint-disable-next-line
  }, []);

  return { token, refresh: fetchList };
}
