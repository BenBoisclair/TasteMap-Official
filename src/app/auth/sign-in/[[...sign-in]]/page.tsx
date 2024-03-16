import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

import { Metadata } from "next";
import NavbarBack from "@/components/navbar/nav-bar-back";

export const metadata: Metadata = {
  title: "Log in",
};

const SignUpPage = () => {
  return (
    <main className="flex flex-col">
      <NavbarBack />
      <div className="flex flex-col px-4 text-center">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="mt-2 text-sm font-medium text-neutral-400">
          We’re so happy to see you again. Fill in your email and password below
          to re-witness the magic.
        </p>
        <div className="mt-2 flex justify-center gap-2">
          <span className="font-medium">No account?</span>
          <Link
            href="/auth/sign-up"
            className="font-bold text-yellow underline">
            Register now!
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
        <SignIn
          appearance={{
            layout: {
              socialButtonsPlacement: "bottom",
              socialButtonsVariant: "blockButton",
              termsPageUrl: "/policy",
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
              footer: "text-3xl flex",
              footerActionLink: "font-bold underline",
            },
          }}
        />
      </div>
    </main>
  );
};

export default SignUpPage;
