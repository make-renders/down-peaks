import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="absolute bottom-8 z-50 hidden w-full lg:flex">
      <div className="mx-auto flex w-full max-w-[1440px] justify-end px-20">
        <Link
          href={"https://makerenders.io"}
          className="flex items-center"
          target={"_blank"}
        >
          <span className="text-xs font-normal">Powered by</span>
          <Image
            src={"/images/logos/isotipo-makers-rojo-16x16.png"}
            alt="logo"
            width={16}
            height={16}
            className="ml-3 mr-1 h-4 w-4 object-contain object-center"
          />
          <span className="text-xs font-bold uppercase">make renders</span>
        </Link>
      </div>
    </footer>
  );
};
