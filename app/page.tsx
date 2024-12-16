"use client";

import Image from "next/image";
import logo from "@buttersDream/logo.png";
import center from "@buttersDream/animation/center.png";
import butterflyLeft from "@buttersDream/animation/butterfly-left.png";
import butterflyRight from "@buttersDream/animation/butterfly-right.png";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [clicked, setClicked] = useState(false);

  return (
    <main className="flex relative w-full min-h-screen overflow-clip flex-col items-center justify-center font-jjibbabba bg-[url('/buttersDream/cludes.png')] bg-cover bg-center">
      {clicked ? (
        <div className="text-black">qweqwe</div>
      ) : (
        <div className="flex flex-col relative h-[100vh] items-center w-full justify-center">
          <Image
            src={logo}
            alt="Butter's Dream"
            width={340}
            height={270}
            className="select-none"
          ></Image>

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
