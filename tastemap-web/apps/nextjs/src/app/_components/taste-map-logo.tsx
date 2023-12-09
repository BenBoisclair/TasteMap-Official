import React from "react";
import Image from "next/image";

function TasteMapLogo({ size = 20 }: { size?: number }) {
  return (
    <Image
      src="/logos/tastemap_logo.png"
      width={size}
      height={size}
      alt={`TasteMap Logo`}
    />
  );
}

export default TasteMapLogo;
