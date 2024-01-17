"use client";
import { useUser } from "@clerk/nextjs";
import { MessageSquarePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WriteReviewModal } from "./write-review-modal";
import { cn } from "~/utils/cn";

interface openWriteReviewModalProps {
  name: string;
  imageUrl: string | null;
  type: "market" | "vendor";
  id: string;
  className?: string;
}

export default function WriteReviewButton({
  name,
  imageUrl,
  type,
  id,
  className,
}: openWriteReviewModalProps) {
  const { isSignedIn } = useUser();
  const [writeReviewToggle, setWriteReviewToggle] = useState<boolean>(false);
  const router = useRouter();

  const openWriteReviewModal = () => {
    if (!isSignedIn) {
      router.push("/auth/sign-in");
      return;
    }
    setWriteReviewToggle(!writeReviewToggle);
  };
  return (
    <>
      <button
        id="Write a Review"
        onClick={openWriteReviewModal}
        className={cn(
          `flex w-[350px] items-center justify-center gap-1 rounded-3xl bg-yellow py-[10px]`,
          className
        )}
      >
        <MessageSquarePlusIcon size={22} color="white" />
        <span className="font-bold">Write a review</span>
      </button>
      {writeReviewToggle && (
        <WriteReviewModal
          name={name}
          imageUrl={imageUrl || ""}
          type={type}
          id={id}
          writeReviewToggle={writeReviewToggle}
          setWriteReviewToggle={setWriteReviewToggle}
        />
      )}
    </>
  );
}
