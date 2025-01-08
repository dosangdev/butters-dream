import ButtonSvg from "@buttersDream/Button.svg";
import Image from "next/image";
import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  width: number;
  height: number;
}

const Button: React.FC<ButtonProps> = ({ label, width, height, onClick }) => {
  return (
    // <button
    //   onClick={onClick}
    //   className={`inline-block flex justify-center items-center w-40 h-16 bg-white border-4 border-black rounded-lg text-xl font-bold text-black shadow-[4px_4px_0px_black] hover:scale-105 hover:shadow-[6px_6px_0px_black] transition-all duration-200 ${JJIBBABBA.variable}`}
    // >
    //   {label}
    // </button>
    // {
    //     ButtonSvg && (<Image src={Button} width={width} height={height}></Image>)
    // }
    <button className="relative">
      <Image src={ButtonSvg} width={width} height={height} alt="qqq" />
      <p className="absolute top-[30%] left-[23%] text-black ">{label}</p>
    </button>
  );
};

export default Button;
