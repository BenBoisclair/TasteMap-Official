import { Link, LogIn } from "lucide-react";

export default function GoToLogIn({ reason }: { reason: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <LogIn size={35} />
      <div>
        Please{" "}
        <Link
          href={`/auth/sign-in`}
          className="underline text-yellow-500 font-medium">
          Log-in
        </Link>{" "}
        {reason}
      </div>
    </div>
  );
}
