import Image from "next/image";

const PromotionIcon = () => {
  return (
    <div className="rounded-full p-1 bg-neutral-200 shrink-0">
      <Image
        alt={`Promotion and Discounts`}
        src={`/icons/promotion_icon.png`}
        width={30}
        height={30}
      />
    </div>
  );
};

export default PromotionIcon;
