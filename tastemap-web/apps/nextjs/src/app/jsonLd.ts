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
