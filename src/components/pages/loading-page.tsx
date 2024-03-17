import Image from "next/image";

export default function LoadingPage() {
  return (
    <div className="flex h-screen justify-center bg-yellow text-center -mt-14">
      <div className="mb-24 flex flex-col justify-center">
        <Image
          src="/logos/tastemap_logo_white.png"
          width={160}
          height={160}
          alt="TasteMap Logo"
          className="mx-auto animate-pulse"
        />
        <span className="mt-2 animate-pulse text-[38px] font-bold">
          TasteMap
        </span>
        <span className="animate-pulse text-3xl font-medium">
          Taste the Local.
        </span>
      </div>
    </div>
  );
}
