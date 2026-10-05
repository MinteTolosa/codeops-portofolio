import Image from "next/image";
import Link from "next/link";
import {Suspense} from "react";

export const revalidate = 3600;

async function getMenus() {
  const response = await fetch( "https://addis-eats-backend.onrender.com/menu/");
  if (!response.ok) {
    throw new Error("Failed to fetch menus");
  }
  const result = await response.json();
  return result.data;
}

export default async function MenuPage() {
  const menus = await getMenus();

  return (
  <main className="min-h-screen bg-[#17130f] px-6 py-12 text-[#f5efe6]">
    <div className="mx-auto max-w-6xl">
    <div className="mb-12 text-center">
     <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#c9a96e]">
       Discover Our Dishes
     </p>
     <h1 className="text-4xl font-bold md:text-5xl">
       Our Menu
     </h1>
    <p className="mx-auto mt-4 max-w-2xl text-[#b8afa3]">
      Explore traditional Ethiopian dishes.
    </p>
    </div>
    <Suspense fallback={<p>Loading dishes...</p>}>
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {menus.map((item) => (
        <div key={item.id}
          className="overflow-hidden rounded-xl border border-[#6f6252]/30 bg-[#211b15] shadow-lg">
        <div className="p-5">
          <Image src={item.image} alt={item.nameEn} width={600} height={600}
            className="h-80 w-full rounded-xl object-cover md:h-[450px]" />
          <h2 className="text-xl font-semibold"> {item.nameEn}</h2>
          <p className="mt-1 text-sm text-[#9e9589]">{item.category}</p>
          <p className="mt-3 text-sm text-[#b8afa3]"> {item.description} </p>
          <p className="mt-4 font-semibold text-[#c9a96e]"> {item.priceETB} ETB </p>
          <p className="mt-2 text-sm text-[#d98b6b]"> {item.spiceLevel} </p>
      <Link href={`/menu/${item.slug}`}
         className="mt-5 block rounded-md border border-[#c9a96e]/60 px-4 py-2.5 text-center text-sm text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#17130f]" >
         View Details
      </Link>
    </div>
    </div>
   ))}
 </div>
 </Suspense>
</div>
</main>
  );
}