import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function UserCard() {
  const { user } = useUser();
  return (
    <div className="flex items-center">
      {!!user?.imageUrl && (
        <Image
          src={user?.imageUrl}
          width={70}
          height={70}
          alt="Profile Picture"
          className="mr-4 shrink-0 rounded-full"
        />
      )}
      {!user?.imageUrl && (
        <div className="w-[70px] h-[70px] from-yellow to-orange bg-gradient-to-br from-50% rounded-full shrink-0 mr-4" />
      )}
      <div className="flex grow flex-col overflow-hidden whitespace-nowrap py-2">
        <span className="text-xl font-bold">
          {user?.fullName ?? "Display Name"}
        </span>
        <span className="text-sm font-medium text-neutral-400">
          {user?.username ?? "@username"}
        </span>
      </div>
    </div>
  );
}
