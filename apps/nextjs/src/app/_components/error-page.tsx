import Image from "next/image";

export default function ErrorPage() {
  return (
    <div className="flex h-screen justify-center text-center">
      <div className="mb-24 flex animate-pulse flex-col justify-center">
        <Image
          src="/logos/tastemap_logo.png"
          width={100}
          height={100}
          alt="TasteMap Logo"
          className="mx-auto"
        />
        <span className="mt-4 text-2xl font-bold">TasteMap</span>
        <span className="mt-4 text-2xl font-medium text-orange-500">
          Error 404
        </span>
        <span className="mt-4 text-orange-500">Please reload the page</span>
      </div>
    </div>
  );
}
