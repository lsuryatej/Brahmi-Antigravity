import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import SignupForm from "./SignupForm";

export const metadata = { title: "Create account — Brahmi" };

export default async function SignupPage() {
  const session = await getSession();
  if (session) redirect("/account");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
}
