import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";

import TasteMapLogo from "~/app/_components/assets/taste-map-logo";

const SignUpPage = () => {
  return (
    <main className="flex flex-col">
      <nav className="mb-5 flex items-center px-5 py-4">
        <Link href="/">
          <ArrowLeft />
        </Link>
        <div className="flex grow justify-center">
          <TasteMapLogo />
        </div>
      </nav>
      <div className="flex flex-col px-4 text-center">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="mt-2 text-sm font-medium text-neutral-400">
          We’re so happy to see you again. Fill in your email and password below
          to re-witness the magic.
        </p>
      </div>
      <div className="flex justify-center">
        <SignIn
          appearance={{
            layout: {
              socialButtonsPlacement: "bottom",
              socialButtonsVariant: "blockButton",
              termsPageUrl: "/terms",
            },
            variables: {
              colorPrimary: "#FFD14E",
              colorDanger: "#EB5E2A",
              colorSuccess: "#33BFBE",
              colorWarning: "#956E00",
              colorBackground: "white",
            },
            elements: {
              formButtonPrimary: "bg-yellow rounded-3xl text-black",
              formFieldInput:
                "rounded-3xl border-none text-black placeholder:gray-400 bg-neutral font-medium",
              card: "rounded-3xl bg-white shadow-none",
              logoBox: "hidden",
              header: "hidden",
              socialButtonsBlockButton: "rounded-3xl",
            },
          }}
        />
      </div>
    </main>
  );
};

export default SignUpPage;
