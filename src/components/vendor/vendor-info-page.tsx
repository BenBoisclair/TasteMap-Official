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
  const productTags = vendor?.tags?.filter((tag) => tag.type === "Product");
  return (
    <div className="whitespace-pre-line text-sm bg-white pb-10">
      <Container>
        <Title title="On their products" />
        <div className=" mt-2 h-full w-full font-medium text-black">
          {vendor.about}
        </div>
      </Container>
      {(vendor.informationItems || []).length > 0 && (
        <Container>
          <div className="no-scrollbar flex h-full w-full gap-3 overflow-x-auto font-medium text-black">
            {vendor.informationItems?.map((item, key) => {
              return <InformationCard item={item} key={key} />;
            })}
          </div>
        </Container>
      )}
      {productTags.length > 0 && (
        <Container>
          <div className="flex items-center">
            <div className="flex items-center gap-3 flex-wrap">
              {productTags?.map((tag, key: number) => {
                return (
                  <Tag key={key} type={tag.type}>
                    {tag.name}
                  </Tag>
                );
              })}
            </div>
          </div>
        </Container>
      )}
      {(vendor?.ingredients || []).length > 0 && (
        <Container>
          <Title title="Ingredients" />
          <div className="mt-2 h-full w-full font-medium text-black">
            {vendor.ingredients}
          </div>
        </Container>
      )}
      {vendor?.priceRange && (
        <Container>
          <Title title="Price Range" />
          <div className="mt-2 h-full w-full font-medium text-black">
            {vendor.priceRange}
          </div>
        </Container>
      )}
      {(vendor?.media || []).length > 0 && (
        <Container>
          <Title title="Media" />
          <div className="no-scrollbar mt-2 flex h-full w-full gap-3 overflow-x-auto font-medium text-black">
            {vendor?.media?.map((media) => {
              return <MediaCard media={media} key={media.id} />;
            })}
          </div>
        </Container>
      )}
      {(vendor?.paymentOptions || []).length > 0 && (
        <Container>
          <Title title="Payment Options" />
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
    <ImageFill
      src={media.mediaUrl}
      alt="Media"
      className="w-[260px] h-[180px] rounded-3xl"
    />
  );
};
