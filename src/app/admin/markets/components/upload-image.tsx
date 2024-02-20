"use client";
import { ChangeEvent, FC, useState } from "react";
import { Input } from "@/components/ui/input";
import { UseFormSetValue } from "react-hook-form";
import { insertMarketSchema } from "@/types/types";
import { z } from "zod";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import uploadImageToSupabase from "@/utils/uploadImageToSupabase";

interface UploadImageProps {
  setValue: UseFormSetValue<z.infer<typeof insertMarketSchema>>;
  id: string;
  // Market or Vendor Id
}

const UploadImage: FC<UploadImageProps> = ({ setValue, id }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    let file;

    if (e.target.files) {
      file = e.target.files[0];
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("File type not supported. Please upload a JPEG or PNG image.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("File is too large. Please upload an image smaller than 5MB.");
        return;
      }
      uploadImageToSupabase(file, `/temp/markets/${id}/${file.name.trim()}`)
        .then(([path]) => {
          setImageUrl(path);
          setValue("bannerUrl", path);
          console.log(path);
        })
        .catch((error) => setError(error.message));
    }
  };
  return (
    <div className="flex flex-col items-center">
      {imageUrl && (
        <div className="w-[250px] h-[140px] relative mb-4">
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL}/storage/v1/object/public/public-assets/${imageUrl}`}
            alt="Uploaded Image"
            fill={true}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      )}
      <div className="flex flex-col">
        <Label htmlFor="uploadImage" className="mb-4">
          Banner Image
        </Label>
        <Input
          id="uploadImage"
          type="file"
          value={""}
          onChange={handleUpload}
          className=" "
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default UploadImage;
