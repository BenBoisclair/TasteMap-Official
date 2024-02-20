import Link from "next/link";

import TasteMapLogo from "../assets/taste-map-logo";

const TasteMapFullLogo = ({ size = 24 }: { size?: number }) => {
  return (
    <Link href={`/`}>
      <div className="flex items-center">
        <TasteMapLogo size={size} />
        <span className="ml-1 text-lg font-bold">Taste Map</span>
      </div>
    </Link>
  );
};

export default TasteMapFullLogo;
