import { useOfferStore } from "@/utils/store";
import { Info } from "lucide-react";

const AdditionalInfoTextarea = () => {
  const { setAdditionalInfo, additionalInfo } = useOfferStore();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAdditionalInfo(e.target.value);
  };

  return (
    <div className="mt-5">
      <div className="flex items-center">
        <Info size={20} />
        <p className="ml-1">Additional Info for Vendor.</p>
      </div>
      <p className="italic text-neutral-400">{`(It will automatically be translated.)`}</p>
      <textarea
        maxLength={150}
        value={additionalInfo}
        onChange={handleChange}
        className="w-full h-24 bg-neutral-200 rounded-xl p-3 mt-2"
        placeholder="Low Spicy, No Onions, etc."
      />
    </div>
  );
};

export default AdditionalInfoTextarea;
