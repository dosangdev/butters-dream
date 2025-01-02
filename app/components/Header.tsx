"use client";

import Image from "next/image";
import Link from "next/link";
import center from "../../public/favicon.ico";
import logo from "@buttersDream/logo.png";
import ConnectButton from "./ConnectButton";

export default function Header() {
  return (
    <div
      className={`px-10 flex absolute top-0 z-[40000] w-screen flex-col justify-between sm:gap-5 py-5 bg-transparent text-sm md:text-lg padded-horizontal md:flex-row`}
    >
      <div className="flex items-center justify-between gap-1 sm:gap-5 w-full">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src={center} width={40} height={60} alt="logo" />
          </Link>

          <div className="flex w-fit items-center">
            <Link href="/butter-desk" className="font-bold text-black">
              <button className=" bg-transparent text-black/80">
                Butterdesk
              </button>
            </Link>
            {/* <Link href="/" className="font-bold text-black">
              <Button className=" bg-transparent text-black/80">About</Button>
            </Link> */}
            <Link href="/butter-desk" className="flex w-fit text-black ">
              <button className=" bg-transparent text-black/80 text-3xl">
                +
              </button>
            </Link>
          </div>
        </div>
        <div className="flex gap-2"></div>
      </div>
      {/* <w3m-button /> */}
      {/* <w3m-connect-button /> */}
      {/* <appkit-connect-button /> */}
      {/* <HeaderButtons /> */}
    </div>
  );
}

function HeaderButtons() {
  return (
    <>
      <>
        <div
          className={`fixed left-0 top-0 z-20 h-[100lvh] w-screen backdrop-blur-sm`}
        />
        <div className="fixed w-[300px] h-[400px] bg-white border-2 -translate-y-1/2 border-black top-1/2 text-center flex flex-col items-center justify-center left-1/2 z-40 -translate-x-1/2">
          <Image src={logo} width={60} height={100} alt="logo" />
          <>
            <button
              onClick={() => {
                // router.push(`/dashboard`);
              }}
              className="px-2.5 py-2 max-w-full font-thin rounded-2xl"
            >
              Dashboard
            </button>
            <button className="bg-transparent text-black">Disconnect</button>
          </>
          <></>
          <button className="bg-orange-400 w-[200px] py-1 mt-2">Close</button>
        </div>
      </>
    </>
  );
}
