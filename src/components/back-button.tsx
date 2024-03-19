"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ size }: { size?: number }) {
  const router = useRouter();
  return (
    <button onClick={router.back} className="pr-3">
      <ArrowLeft size={size} />
    </button>
  );
}
