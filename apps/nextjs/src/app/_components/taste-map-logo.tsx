import React from "react";
import Image from "next/image";

function TasteMapLogo() {
  return (
    <Image
      src="/logos/tastemap_logo.png"
      width={20}
      height={20}
      alt={`TasteMap Logo`}
    />
  );
}

export default TasteMapLogo;
