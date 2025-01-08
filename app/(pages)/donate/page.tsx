"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useNft, { NftDetail } from "@/hooks/useNft";
import { BUTTER_TOKEN_ADDRESS } from "@/constants";
import Link from "next/link";
import useBuySell from "@/hooks/useBuySell";
import Loading from "@/components/Loading";
import { commify, shortenNumber, uncommify } from "mint.club-v2-sdk";
import { customShortenNumber } from "@/utils/strings";
import { useAppKitAccount } from "@reown/appkit/react";
import toast from "react-hot-toast";

export default function DonatePage() {
  const [tokenData, setTokenData] = useState(null); // API 데이터 저장
  const [tradeType, setTradeType] = useState<"buy" | "sell" | null>("buy");
  const [input, setInput] = useState(0);

  const {
    data: nftDetail,
    refresh: refreshDetail,
    loading,
  } = useNft(BUTTER_TOKEN_ADDRESS); // 특정 토큰 불러오기

  const { address, caipAddress, isConnected } = useAppKitAccount();

  const { buy, estimating, txLoading, estimation } = useBuySell(
    tradeType,
    BUTTER_TOKEN_ADDRESS,
    // Number(input)
    Number(input)
  );

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-[1200px] text-black pt-10 px-5">
        <div className="w-full mb-5">
          <div className="text-black">
            <span>0.1</span>
            <span> USDC</span>
          </div>
          <div>
            <span>1 USDC의 현재 미국 달러(USD) 기준 가격</span>
          </div>
        </div>
        {nftDetail?.image && (
          <Image
            src={nftDetail.image}
            alt="butter coin logo!"
            width={100}
            height={100}
          />
        )}
        <div className="flex w-full mt-5 gap-2 justify-between">
          {/* 차트 영역 */}
          <div className="flex-1 max-w-[770px] min-w-[300px]">
            <iframe
              src="https://www.defined.fi/base/0x8934a604ad5637acfd7987e0c7c95035279eb0cdf19f08a813f252978ac40a81?quoteToken=token0&embedded=1&hideTxTable=1&hideToolbar=1&hideSidebar=1&hideChart=0&hideChartEmptyBars=1&embedColorMode=DEFAULT&cache=29e68"
              className="rounded-md"
              width="100%"
              height="500px"
              title="Butter Chart"
            ></iframe>
          </div>

          {/* 오른쪽 고정 크기 영역 */}
          <div className="w-[350px] border-4 border-black rounded-md">
            <div className="p-[30px]">
              <div className="flex justify-between">
                <div>Buy</div>
                <div>slippage Tolerance</div>
              </div>
              <div className="flex flex-col">
                <div className="text-gray-700">Amount to buy</div>
                <div className="flex border-b-2 border-gray-800">
                  <input
                    className="max-w-36 bg-transparent outline-none	pl-2"
                    type="text"
                    placeholder="0"
                    value={input === 0 ? "" : commify(input)}
                    onChange={(e) => setInput(Number(e.target.value))}
                  />
                  <div>
                    <div>butter image</div>
                    <div>coin name</div>
                  </div>
                </div>
                <button
                  className="text-black w-full h-[50px]"
                  onClick={async () => {
                    console.log("buy or sell");
                    try {
                      if (tradeType === "buy") {
                        await buy(() => {
                          toast.success("거래가 성공적으로 완료되었습니다.");
                        });
                      }
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                >
                  구매해볼까
                </button>
              </div>
              <div>Required base asset</div>
              <div>cross-chain swap</div>
              <div className="flex">
                get usdc via
                <Link
                  className="border-black border-2 flex"
                  href="https://app.1inch.io/#/8453/simple/swap/ETH/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
                >
                  <Image
                    src="https://mint.club/_next/static/media/1inch.034c8bf9.svg"
                    alt="1inch image"
                    width={20}
                    height={20}
                  ></Image>
                  <span className="inline-block">1inch</span>
                </Link>
              </div>
              <div>connect wallet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuySellButtons(
  props: { tokenAddress: `0x${string}` } & {
    data: NftDetail;
    refresh: ReturnType<typeof useNft>["refresh"];
  }
) {
  const [tradeType, setTradeType] = useState<"buy" | "sell" | null>(null);
  const [input, setInput] = useState(0);
  // const { account } = useWallet();
  const { tokenAddress, data, refresh: refreshToken } = props;
  const { maxSupply, sold } = data;
  // const {
  //   balance,
  //   loadingBalance,
  //   refresh: refreshBalance,
  // } = useNftBalance(tokenAddress);
  // const {
  //   balance: krwBalance,
  //   loadingBalance: loadingKrw,
  //   refresh: refreshKrw,
  // } = useERC20Balance(CHUNWON_TOKEN_ADDRESS);

  const { buy, sell, estimating, txLoading, estimation } = useBuySell(
    tradeType,
    tokenAddress,
    Number(input)
  );

  const { address, caipAddress, isConnected } = useAppKitAccount();

  // const notEnoughBalance = input && !estimating && krwBalance < estimation;

  // function reset() {
  //   setTradeType(null);
  //   setInput(0);
  //   refresh();
  // }

  // function refresh() {
  //   refreshBalance();
  //   refreshKrw();
  //   refreshToken();
  // }

  return tradeType !== null ? (
    <div className="mt-5 flex flex-col">
      <input
        className="w-full border border-gray-500 bg-transparent p-2 text-sm text-white outline-none"
        inputMode="numeric"
        placeholder={
          tradeType === "sell" ? "몇개를 판매할까요?" : "몇개를 구매할까요?"
        }
        prefix=""
        autoFocus
        value={input === 0 ? "" : commify(input)}
        onChange={(e) => {
          let value = uncommify(e.target.value);
          let numeric = Number(value.replace(/[^0-9]/g, ""));

          if (tradeType === "sell") {
            numeric = Math.min(Math.max(numeric, 0), sold);
          }

          if (tradeType === "buy") {
            numeric = Math.min(numeric, maxSupply - sold);
          }

          setInput(numeric);
        }}
      />

      <div>
        <div className="mt-5 text-xs text-white">
          {tradeType === "sell" ? "예상 수익" : "예상 비용"}
        </div>
        {input !== undefined && estimating ? (
          <div className="text-yellow-500">가격 계산중...</div>
        ) : (
          <div className="text-green-500">
            {customShortenNumber(estimation)}
          </div>
        )}
        <div className="text-[10px] text-gray-500">
          {commify(estimation * 1000)}원
        </div>
      </div>

      <div className="relative mt-5 flex gap-2 text-sm">
        {/* <Button
          className="w-full bg-gray-500 text-black"
          onClick={() => {
            reset();
          }}
        >
          취소
        </Button>
        <Button
          className="w-full bg-green-500 text-black"
          loading={estimating || txLoading}
          spinnerColor="grey"
          disabled={!account || !input || !!notEnoughBalance}
          onClick={async () => {
            console.log("buy or sell");
            try {
              if (tradeType === "sell") {
                await sell(() => {
                  toast.success("거래가 성공적으로 완료되었습니다");
                  reset();
                });
              } else {
                await buy(() => {
                  toast.success("거래가 성공적으로 완료되었습니다");
                  reset();
                });
              }
            } catch (e) {
              console.error(e);
            }
          }}
        >
          {tradeType === "sell" ? "판매" : "구매"}
        </Button> */}
        {!isConnected && (
          <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-xs font-bold text-white backdrop-blur-sm">
            로그인이 필요합니다
          </div>
        )}
      </div>
      {/* {!!notEnoughBalance && (
        <div className="mt-5 text-center text-xs text-red-500">
          잔고가 부족합니다
        </div>
      )} */}
      {/* <div className="mt-5 flex items-center text-xs text-gray-500">
        현재{" "}
        <span className="mx-1 flex items-center text-white">
          {loadingBalance ? (
            <Loading className="mx-1 inline-block" size={12} />
          ) : (
            commify(shortenNumber(balance))
          )}
          개
        </span>
        보유중
      </div> */}
      {/* <div className="mt-2 flex items-center text-xs text-gray-500">
        내 잔고{" "}
        <span className="mx-1 flex items-center text-green-500">
          {loadingKrw ? (
            <Loading className="mx-1 inline-block" size={12} />
          ) : (
            commify(krwBalance * 1000)
          )}{" "}
          KRW
        </span>
      </div> */}
    </div>
  ) : (
    <div className="relative mt-5 flex gap-2 text-sm">
      {/* <Button
        className="w-full bg-gray-500 text-black"
        onClick={() => setTradeType("sell")}
      >
        판매
      </Button>
      <Button className="w-full" onClick={() => setTradeType("buy")}>
        구매
      </Button>
      {!account && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-xs font-bold text-white backdrop-blur-sm">
          로그인이 필요합니다
        </div>
      )} */}
    </div>
  );
}
