"use client";

import Image from "next/image";
import logo from "@buttersDream/logo.png";
import center from "@buttersDream/animation/center.png";
import butterflyLeft from "@buttersDream/animation/butterfly-left.png";
import butterflyRight from "@buttersDream/animation/butterfly-right.png";
import butter3 from "@buttersDream/butter3.svg";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import useNftList from "./hooks/useNftList";
// import ConnectButton from "./components/ConnectButton";
import Button from "./components/Button";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import ButtonSvg from "@buttersDream/Button.svg";
import Link from "next/link";
import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";
import { useGlobalStore } from "./stores/global";

export default function Home() {
  const { address: account } = useAppKitAccount();
  const [userData, setUserData] = useState(null);
  const [clicked, setClicked] = useState(false);
  const { token, refresh } = useNftList();
  console.log(token);

  const variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const imageVariants = {
    initial: { x: 0, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.8 } },
    exit: { x: -100, opacity: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    async function fetchUser() {
      if (!account) return;

      try {
        const res = await fetch(`/api/lookup-user?walletAddress=${account}`);
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUser();
  }, [account]);

  return (
    <main className="flex relative w-full  overflow-clip flex-col items-center justify-center font-jjibbabba ">
      {clicked ? (
        <motion.div
          className="flex flex-col relative h-[80vh] p-20 items-center w-full"
          key="content"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
        >
          <motion.div>
            <span className="text-black absolute top-[20%] left-[41%] text-3xl">
              Pls make me fly!
            </span>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={imageVariants}
              className="flex flex-col items-center"
            >
              <Image
                src={butter3}
                alt="Butter's image in center"
                width={147}
                height={100}
                className="pt-44 pb-20"
              />
            </motion.div>
            <div className="w-full text-black h-36">qqq</div>
            <div className="flex justify-center gap-6 mt-8">
              <Link href="/donate">
                <Button label="Get started" width={200} height={50} />
              </Link>
              <Button label="Learn more" width={200} height={50} />
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <div className="flex flex-col relative h-[80vh] p-20 items-center w-full">
          <motion.div
            className="relative cursor-pointer"
            onClick={() => setClicked(!clicked)}
            whileHover="hover"
          >
            {/* 중앙 이미지 */}
            <span className="text-black absolute top-[20%] left-[38%] text-3xl">
              Oh, Hi
            </span>
            <Image
              src={center}
              alt="Butter's image in center"
              width={440}
              height={320}
            />

            {/* 왼쪽 애니메이션 이미지 */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              variants={{
                hover: { x: 80, opacity: 1 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute top-[50%] left-[-120px] "
            >
              <Image
                src={butterflyLeft}
                alt="Butterfly Left"
                width={150}
                height={150}
              />
            </motion.div>

            {/* 오른쪽 애니메이션 이미지1 */}
            <motion.div
              initial={{ x: 100, y: 0, opacity: 0 }}
              variants={{
                hover: { x: 50, y: 30, opacity: 1 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute top-[-10%] right-[20px] "
            >
              <Image
                src={butterflyRight}
                alt="Butterfly Right"
                width={150}
                height={150}
              />
            </motion.div>

            {/* <ConnectButton label="qqqqqqq" width={180} height={47} /> */}
            {/* 오른쪽 애니메이션 이미지2 */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              variants={{
                hover: { x: 50, opacity: 1 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute top-[60%] right-[20px] "
            >
              <Image
                src={butterflyRight}
                alt="Butterfly Right"
                width={150}
                height={150}
              />
            </motion.div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
