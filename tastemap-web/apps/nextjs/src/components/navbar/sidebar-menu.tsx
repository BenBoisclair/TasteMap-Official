import { SignedIn, SignedOut } from "@clerk/nextjs";
import { X } from "lucide-react";
import { cn } from "~/utils/cn";
import LogInButton from "../auth/log-in-button";
import { SideMenuSignedIn } from "./side-menu-signed-in";
import Image from "next/image";
import Link from "next/link";
import UserCard from "./user-card";
import LogOutButton from "../auth/log-out-button";
import { SideMenuSignedOut } from "./side-menu-signed-out";

export function DefaultSideMenu({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        `flex w-full flex-col gap-4 text-lg font-bold py-5`,
        className
      )}
    >
      <Link href={`/`} className="w-full">
        <span className="font-bold">Home</span>
      </Link>
    </div>
  );
}

export function GeneralSideMenu({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        `flex w-full flex-col gap-4 py-5 text-lg font-bold`,
        className
      )}
    >
      <span className=" text-base text-neutral-400 font-medium">General</span>
      {/* <span>Language</span>
                  <span>FAQs</span>
                  <span>Report issues</span> */}
      <Link href={`/policy`}>
        <span>Privacy Policy</span>
      </Link>
    </div>
  );
}

export function UserSideMenu({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        `flex w-full flex-col gap-4 py-5 text-lg font-bold`,
        className
      )}
    >
      <span className=" text-base text-neutral-400 font-medium">Profile</span>

      {/* <Link href={`/profile/reviews`}>
        <span>Your reviews</span>
      </Link> */}
      <Link href={`/profile/favourites`}>
        <span>Favorites</span>
      </Link>
    </div>
  );
}

interface SideMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function SideMenu({ isMenuOpen, toggleMenu }: SideMenuProps) {
  return (
    <>
      <div
        className={cn(
          `fixed left-0 top-0 z-[200] h-screen w-[300px] bg-white duration-500 ease-in-out`,
          {
            "left-[0%]": isMenuOpen,
            "left-[-100%]": !isMenuOpen,
          }
        )}
      >
        <div className="h-full w-full">
          <div className="flex cursor-pointer  justify-end p-4">
            <X size={28} onClick={() => toggleMenu()} />
          </div>
          <div className="px-5 pb-5">
            <SideMenuSignedOut>
              <LogInCallToAction />

              <DefaultSideMenu className="border-b-2 border-neutral mt-6" />
              <GeneralSideMenu />
              {/* <TastyBoi /> */}
            </SideMenuSignedOut>

            <SideMenuSignedIn>
              <UserCard />
              <DefaultSideMenu className="border-b-2 border-neutral mt-6" />
              <UserSideMenu />
              <GeneralSideMenu className="border-y-2 border-neutral" />

              <LogOutButton className=" mt-20" />
            </SideMenuSignedIn>
          </div>
        </div>
      </div>
    </>
  );
}

const LogInCallToAction = () => {
  return (
    <>
      <span className="mb-2 font-medium">
        Join us in supporting <span className="text-green">local Tourism!</span>
      </span>
      <LogInButton />
    </>
  );
};

const TastyBoi = () => {
  return (
    <div className="flow-col flex w-full grow items-end justify-center">
      <Image
        src={`/mascot/TastyBoiSurprised.png`}
        alt="TastyBoi!"
        width={200}
        height={300}
      />
    </div>
  );
};
