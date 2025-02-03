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
      <p className="md:text-2xl ml-2">
        Digital
        <span className="block">Message</span>
        <span className="block">Board</span>
      </p>
    </div>
  );
}
