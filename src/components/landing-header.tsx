import Link from "next/link";
import ImageFill from "./image-fill";
import { MousePointer2Icon, MousePointerIcon, Search } from "lucide-react";

export default function LandingHeader() {
  const featuredMarketId = `Hx_IO9ngLgfRzqkna6SH`;

  return (
    <div className="flex flex-col bg-white gap-4 mb-6 md:hidden">
      <div className="flex gap-2 md:w-full ">
        <div className="flex flex-col">
          <ImageFill
            src={`/images/3.png`}
            className=" rounded-br-3xl w-full h-full min-w-[215px]"
            alt="Picture">
            <Link href={`/market/${featuredMarketId}`}>
              <div className="bg-black/30 absolute w-full h-full" />
            </Link>
          </ImageFill>
          <div className="p-3">
            <span className="text-2xl font-bold leading-none">{`Thailand’s greatest local markets---all in one place.`}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2  md:grow md:max-w-[200px]">
          <ImageFill
            src={`/images/4.png`}
            alt="Picture"
            className="w-[167px] h-[51px] rounded-bl-3xl md:w-full"
          />
          <ImageFill
            src={`/images/1.png`}
            alt="Picture"
            className="w-[167px] h-[200px] rounded-l-3xl md:w-full"
          />
        </div>
      </div>
      <div id="SearchBar" className="px-5 md:w-[400px]">
        <div className="-neutral-400 -2 rounded-3xl relative">
          <Link
            href={`/vendors`}
            className="flex w-full items-center gap-2 rounded-3xl bg-neutral px-3 py-2">
            <Search size={25} color="gray" />
            <input
              className="w-full bg-transparent outline-none ring-0"
              placeholder="markets, shop types, products, etc"
            />
          </Link>
          <div className="absolute top-5 -right-5">
            <MousePointerIcon size={35} fill="white" />
          </div>
        </div>
      </div>
      <Link href={`/market/${featuredMarketId}`}>
        <div className="flex gap-2">
          <ImageFill
            src={`/images/2.png`}
            className="w-[145px] h-[90px] rounded-bl-3xl rounded-tr-3xl shrink-0"
            alt="Picture"
          />
          <ImageFill
            src={`/images/5.png`}
            className="w-full h-[90px] rounded-tl-3xl rounded-br-3xl"
            alt="Picture"
          />
        </div>
      </Link>
    </div>
  );
}
