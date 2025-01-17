import logo from "@/assets/logo.png";
import Image from "next/image";
export default function DmbLogo() {
  return (
    <div className={`flex flex-row items-center leading-none text-white`}>
      <Image
        src={logo}
        alt="Digital Message Board logo"
        width={50}
        height={50}
      />
      <p className="text-xl">Dmb</p>
    </div>
  );
}
