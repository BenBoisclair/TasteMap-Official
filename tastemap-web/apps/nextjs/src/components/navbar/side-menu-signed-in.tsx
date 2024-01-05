import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

import LogOutButton from "../auth/log-out-button";
import { GeneralSideBar } from "./nav-bar";

export const SideMenuSignedIn = () => {
  const { user } = useUser();
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="flex">
          <Image
            src={user?.imageUrl ?? ""}
            width={70}
            height={70}
            alt="Profile Picture"
            className="mr-4 shrink-0 rounded-full"
          />
          <div className="flex grow flex-col overflow-hidden whitespace-nowrap py-2">
            <span className="text-xl font-bold">
              {user?.fullName ?? "Display Name"}
            </span>
            <span className="text-sm font-medium text-neutral-400">
              {user?.username ?? "@username"}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex grow flex-col text-lg font-bold">
        <div className="flex flex-col gap-4 py-5">
          {user?.publicMetadata.role === "Admin" ? (
            <Link href="/dashboard">
              <span>Admin Dashboard</span>
            </Link>
          ) : null}
          <Link href="/">Home</Link>
        </div>
        <div className="flex flex-col gap-4 py-5 border-y-[3px] border-neutral">
          <span>Your reviews</span>
          <span>Favorites</span>
        </div>
        {/* <div className="flex flex-col gap-4 border-b-[3px] border-t-[3px] border-neutral py-5">
          <span>Write a review</span>
        </div> */}
        <GeneralSideBar />
      </div>
      <div className="mb-10 grow">
        <LogOutButton />
      </div>
    </div>
  );
};
