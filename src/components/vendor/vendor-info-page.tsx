import Image from "next/image";
import {
  BookOpenText,
  Coins,
  Info,
  PlayCircle,
  Refrigerator,
  Wallet,
} from "lucide-react";

import type { InformationItems, Media, Vendor } from "@/types/types";
import { Tag } from "../tag";
import { InformationCard } from "./information-card";
import Title from "../title";
import Container from "../container";
import ImageFill from "../image-fill";

interface VendorInfoPageProps {
  vendor: Vendor;
}

export default function VendorInfoPage({ vendor }: VendorInfoPageProps) {
  return (
    <div className="whitespace-pre-line text-sm bg-white pb-10">
      <Container>
        <Title title="About" icon={<Info size={20} />} />
        <div className=" mt-2 h-full w-full font-medium text-black">
          {vendor.about}
        </div>
      </Container>
      {(vendor.informationItems || []).length > 0 && (
        <Container>
          <Title title="Flash Cards" icon={<BookOpenText size={20} />} />
          <div className="no-scrollbar mt-2 flex h-full w-full gap-3 overflow-x-auto font-medium text-black">
            {vendor.informationItems?.map((item) => {
              return <InformationCard item={item} key={item.id} />;
            })}
          </div>
        </Container>
      )}
      {(vendor?.ingredients || []).length > 0 && (
        <Container>
          <Title title="Ingredients" icon={<Refrigerator size={20} />} />
          <div className="mt-2 h-full w-full font-medium text-black">
            {vendor.ingredients}
          </div>
        </Container>
      )}
      <Container>
        <Title title="Price Range" icon={<Coins size={20} />} />
        <div className="mt-2 h-full w-full font-medium text-black">
          {vendor.priceRange}
        </div>
      </Container>
      {(vendor?.media || []).length > 0 && (
        <Container>
          <Title title="Media" icon={<PlayCircle size={20} />} />
          <div className="no-scrollbar mt-2 flex h-full w-full gap-3 overflow-x-auto font-medium text-black">
            {vendor?.media?.map((media) => {
              return <MediaCard media={media} key={media.id} />;
            })}
          </div>
        </Container>
      )}
      {(vendor?.paymentOptions || []).length > 0 && (
        <Container>
          <Title title="Payment Options" icon={<Wallet size={20} />} />
          <div className="mt-2 flex gap-3">
            {vendor?.paymentOptions?.map((option) => (
              <Tag type="Facility" key={option.id} size="lg">
                {option.name}
              </Tag>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}

export const MediaCard = ({ media }: { media: Media }) => {
  return (
    <>
      <ImageFill
        src={media.mediaUrl}
        alt="Media"
        className="w-[260px] h-[180px] rounded-3xl"
      />
    </>
  );
};
