import Image from "next/image";

export default function LoadingPage() {
  return (
    <div className="flex h-screen justify-center text-center">
      <div className="mb-24 flex flex-col justify-center">
        <Image
          src="/logos/tastemap_logo.png"
          width={100}
          height={100}
          alt="TasteMap Logo"
          className="mx-auto animate-pulse"
        />
        <span className="mt-4 animate-pulse text-2xl font-bold">TasteMap</span>
        <span className="mt-4 text-2xl font-bold text-yellow">Loading...</span>
      </div>
    </div>
  );
}
