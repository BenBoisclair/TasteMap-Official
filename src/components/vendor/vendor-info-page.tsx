import type { Media, Vendor } from "@/types/types";
import { Tag } from "../tag";
import { InformationCard } from "./information-card";
import Title from "../title";
import Container from "../container";
import ImageFill from "../image-fill";
import Markdown from "react-markdown";

interface VendorInfoPageProps {
  vendor: Vendor;
}

export default function VendorInfoPage({ vendor }: VendorInfoPageProps) {
  const productTags = vendor?.tags?.filter((tag) => tag.type === "Product");
  const shopTags = vendor?.tags?.filter((tag) => tag.type === "Shop Type");
  return (
    <div className="whitespace-pre-line text-sm bg-white pb-10">
      <Container>
        <Title title="On their products" />
        <div className=" mt-2 h-full w-full font-medium text-black">
          <Markdown>{vendor.about}</Markdown>
        </div>
      </Container>
      {(vendor.informationItems || []).length > 0 && (
        <Container className="-px-5">
          <div className="no-scrollbar flex h-full w-full gap-3 overflow-x-auto font-medium text-black px-5">
            {vendor.informationItems?.map((item, key) => {
              return <InformationCard item={item} key={key} />;
            })}
          </div>
        </Container>
      )}
      {productTags.length > 0 && (
        <Container>
          <div className="flex items-center">
            <div className="flex gap-2 flex-col w-full">
              <div className="flex gap-3 items-center">
                {productTags?.map((tag, key: number) => {
                  return (
                    <Tag key={key} type={tag.type} size="lg">
                      {tag.name}
                    </Tag>
                  );
                })}
              </div>
              <div className="flex gap-3 items-center">
                {shopTags?.map((tag, key: number) => {
                  return (
                    <Tag key={key} type={"Facility"} size="lg">
                      {tag.name}
                    </Tag>
                  );
                })}
              </div>
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
