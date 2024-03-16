import Script from "next/script";
import { Organization, WithContext } from "schema-dts";

export const tastemapJsonld: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TasteMap",
  alternateName: "เทสแมป",
  description: "Platform for Local Tourism!",
  url: "http://www.taste-map.com",
  slogan: "Taste the Local!",
  email: "contact@taste-map.com",
  founder: "The Hominians Co.,Ltd.",
  legalName: "The Hominians Co.,Ltd.",
  taxID: "0105565098318",
};

export default function TasteMapJsonD() {
  return (
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(tastemapJsonld) }}
    />
  );
}
