"use client";

import { useGlobalStore } from "@/stores/global";
import { abbreviateAddress } from "@/utils/strings";
import ButtonSvg from "@buttersDream/Button.svg";
import logo from "@buttersDream/logo.png";
import "@reown/appkit-wallet-button/react";
import {
  useAppKit,
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitTheme,
  useDisconnect,
} from "@reown/appkit/react";
import Image from "next/image";
import Link from "next/link";

export default function Header({ hide }: { hide?: boolean }) {
  const modal = useAppKit();

  return (
    <div
      className={`px-14 flex absolute top-0 z-[40000] w-screen flex-row items-center justify-between sm:gap-5 py-5 bg-transparent text-sm md:text-lg`}
    >
      {/* 왼쪽 네비게이션 */}
      <div className="w-[330px] flex gap-6">
        <Link href="" className="font-bold text-black">
          <button className="bg-transparent text-black/80">About</button>
        </Link>
        <Link href="/donate" className="font-bold text-black">
          <button className="bg-transparent text-black/80">Buy/Donate</button>
        </Link>
        <Link href="" className="font-bold text-black">
          <button className="bg-transparent text-black/80">My Butter</button>
        </Link>
      </div>

      {/* 가운데 로고 */}
      <div className="flex justify-center items-center flex-grow">
        <Link href="/">
          <Image
            src={logo}
            alt="Butter's Dream"
            width={200}
            height={100}
            className="select-none"
          />
        </Link>
      </div>

      {/* 오른쪽 버튼 */}
      <div className="w-[330px] flex justify-end">
        <ConnectButton label="Connect" width={180} height={47} />
      </div>
    </div>
  );
}

interface ButtonProps {
  label: string;
  width: number;
  height: number;
}

const ConnectButton: React.FC<ButtonProps> = ({ label, width, height }) => {
  const modal = useAppKit();

  const { address, isConnected } = useAppKitAccount();

  // console.log("========== Account Information ==========");
  // console.log(`Address: ${address}`);
  // console.log(`Addresses: ${JSON.stringify(addresses, null, 2)}`);
  // console.log(`Chain: ${chain?.name || "Not connected"}`);
  // console.log(`Chain ID: ${chainId}`);
  // console.log(`Connector: ${connector?.name || "None"}`);
  // console.log(`Is Connected: ${isConnected}`);
  // console.log(`Is Reconnecting: ${isReconnecting}`);
  // console.log(`Status: ${status}`);
  // console.log("=========================================");

  const compactHash = (hash: string) =>
    hash.slice(0, 6) + "..." + hash.slice(-4);

  function openAppKit() {
    modal.open();
  }

  return (
    <>
      {isConnected ? (
        <>
          <button
            className="border-2 border-black rounded-md w-[180] h-[47px] text-black "
            onClick={openAppKit}
          >
            {abbreviateAddress(address) || ""}
          </button>
        </>
      ) : (
        <button className="relative" onClick={openAppKit}>
          <Image
            src={ButtonSvg}
            width={width}
            height={height}
            alt="wallet button"
          />
          <p className="absolute top-[30%] left-[26%] text-black ">{label}</p>
        </button>
      )}
    </>
  );
};
