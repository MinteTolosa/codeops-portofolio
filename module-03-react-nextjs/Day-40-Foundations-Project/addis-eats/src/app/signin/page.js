
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Sign In
        </h1>

        <p className="mt-3 text-gray-600">
          The sign-in form will be implemented in Day 42.
        </p>

        <p className="mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-700 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
