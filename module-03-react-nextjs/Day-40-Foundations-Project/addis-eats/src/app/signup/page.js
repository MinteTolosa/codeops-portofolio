
import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Create Account
        </h1>

        <p className="mt-3 text-gray-600">
          The registration form will be implemented in Day 42.
        </p>

        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
