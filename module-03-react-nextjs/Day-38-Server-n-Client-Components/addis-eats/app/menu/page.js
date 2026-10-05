
import {Suspense} from "react";
import TestButton from "./TestButton";
import DishList from "./DishList";
import FilterShell from "./FilterShell";

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
    <FilterShell>
    <DishList menus={menus} />
    </FilterShell>
    <TestButton />
 </Suspense>
</div>
</main>
  );
}