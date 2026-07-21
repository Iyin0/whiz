import Image from "next/image";

import { cn } from "@/lib/utils";

export const Logo = ({ textColor }: { textColor: 'white' | 'black' | 'theme' }) => {
  return (
    <div className="inline-flex select-none flex-col items-center gap-1.5">
      <Image
        src="/Logo.svg"
        alt=""
        width={55}
        height={30}
        priority
        className="h-[30px] w-[55px] object-contain"
      />
      <span
        className={cn(
          "whitespace-nowrap font-jakarta text-[9px] font-semibold uppercase leading-[13.5px] tracking-[0.22em] transition-colors duration-300",
          textColor === "white"
            ? "text-white"
            : textColor === "black"
              ? "text-[#0d1117]"
              : "text-[#0d1117] dark:text-white",
        )}
      >
        Whiz Academy
      </span>
    </div>
  );
};
