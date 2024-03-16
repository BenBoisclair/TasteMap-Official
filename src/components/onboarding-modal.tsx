"use client";

import { Dialog } from "@headlessui/react";
import TasteMapLogo from "./assets/taste-map-logo";
import ImageFill from "./image-fill";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function OnboardingModal() {
  const [open, setOpen] = useLocalStorage("onboardingModal", true);
  return (
    <Dialog
      open={open}
      onClose={() => {}}
      className={"fixed inset-0 z-[200] flex items-center justify-center"}>
      <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
      <Dialog.Panel
        className={
          "z-[200] flex h-fit w-fit flex-col rounded-3xl bg-white p-5 text-center"
        }>
        <div className="mb-4">
          <TasteMapLogo size={25} />
        </div>
        <span className="text-sm font-medium">Hello Traveler!</span>
        <span className="text-xl font-bold">I'm TasteMap.</span>
        <div className="flex justify-center my-4">
          <ImageFill
            src="/mascot/TastyBoiGreeting.png"
            alt="Onboarding Modal"
            contain={true}
            className="w-[180px] h-[180px] rounded-3xl"
          />
        </div>
        <span className="text-sm max-w-sm font-medium">{`Follow me to explore, buy, and`}</span>
        <span className="text-sm max-w-sm font-medium">{`review local products!`}</span>
        <button
          onClick={() => {
            setOpen(false);
          }}
          className="rounded-3xl bg-yellow text-xl py-2 w-[260px] font-bold mt-4">
          Let's start!
        </button>
      </Dialog.Panel>
    </Dialog>
  );
}
