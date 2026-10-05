export default function Loading() {
  return (
    <main className="min-h-screen bg-[#17130f] px-6 py-12 text-[#f5efe6]">
      <div className="mx-auto max-w-6xl">
       <div className="mb-12 text-center">
        <div className="mx-auto h-4 w-40 animate-pulse rounded bg-[#6f6252]/40" />
        <div className="mx-auto mt-4 h-10 w-64 animate-pulse rounded bg-[#6f6252]/40" />
        <div className="mx-auto mt-4 h-5 w-full max-w-2xl animate-pulse rounded bg-[#6f6252]/30" />
       </div>
       <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
         {Array.from({ length: 6 }).map((_, index) => (
           <div key={index} className="overflow-hidden rounded-xl border border-[#6f6252]/30 bg-[#211b15]">
             <div className="h-56 animate-pulse bg-[#6f6252]/30" />
             <div className="p-5">
             <div className="h-6 w-32 animate-pulse rounded bg-[#6f6252]/30" />
             <div className="mt-3 h-4 w-20 animate-pulse rounded bg-[#6f6252]/20" />
             <div className="mt-5 h-4 w-16 animate-pulse rounded bg-[#6f6252]/20" />
             <div className="mt-5 h-10 w-full animate-pulse rounded bg-[#6f6252]/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}