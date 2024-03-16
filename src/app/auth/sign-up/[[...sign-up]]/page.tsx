import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

import { Metadata } from "next";
import NavbarBack from "@/components/navbar/nav-bar-back";

export const metadata: Metadata = {
  title: "Register",
};

const SignUpPage = () => {
  return (
    <main className="flex flex-col">
      <NavbarBack />
      <div className="flex flex-col px-4 text-center">
        <h1 className="text-2xl font-bold">New here?</h1>
        <p className="mt-2 text-sm font-medium text-neutral-400">
          Welcome! We’re delighted to meet you. By continuing, you agree to our{" "}
          <Link
            href={`/policy`}
            className="underline text-blue font-bold"
            target="_blank">
            privacy policy
          </Link>
        </p>
      </div>
      <div className="flex justify-center">
        <SignUp
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
              formResendCodeLink: "font-medium text-neutral",
              // otpCodeField: "w-full",
              otpCodeFieldInputs: "flex justify-between w-full",
              otpCodeFieldInput:
                "rounded-3xl border-none text-black placeholder:gray-400 bg-neutral font-medium px-4 h-[80px] text-xl",
            },
          }}
        />
      </div>
    </main>
  );
};

export default SignUpPage;
