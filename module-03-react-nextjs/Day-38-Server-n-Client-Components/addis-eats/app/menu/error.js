"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#17130f] px-6 text-[#f5efe6]">
     <div className="max-w-md text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-[#c9a96e]">
        Something went wrong
      </p>
      <h1 className="mt-4 text-4xl font-bold">
        Unable to load the menu
      </h1>
      <p className="mt-4 text-[#b8afa3]">
        We couldn't load the menu right now. Please try again.
      </p>
      <button onClick={() => reset()}
       className="mt-8 rounded-md bg-[#c9a96e] px-6 py-3 font-semibold text-[#17130f] transition hover:bg-[#dfc38d]" >
        Try Again
       </button>
        
    </div>
  </main>
  );
}