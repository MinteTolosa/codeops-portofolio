
import { Suspense } from "react";
import SignInForm from "./SignInForm";

// Day 42 — Sign-In Page

export default function SignInPage() {
  return (
    <main className="px-6 py-16">
      <Suspense fallback={<p>Loading sign-in form...</p>}>
        <SignInForm />
      </Suspense>
    </main>
  );
}
