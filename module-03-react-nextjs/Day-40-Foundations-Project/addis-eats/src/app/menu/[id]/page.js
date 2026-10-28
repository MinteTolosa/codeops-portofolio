import React from 'react'
import { notFound } from 'next/navigation';
import Link from "next/link";
import AddToCartButton from '@/app/components/AddToCartButton';


async function getMenus() {
  const url = "https://addis-eats-backend.onrender.com/menu/";
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, {
        cache: "force-cache",
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch menus: ${response.status}`);
      }
      const result = await response.json();
      if (!Array.isArray(result.data)) {
        throw new Error("The API did not return a valid menu array.");
      }
      return result.data;
    } catch (error) { lastError = error;
      console.error(
        `Menu fetch attempt ${attempt} failed:`, error
      );
      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 1500)
        );
      }
    }
  }
  throw lastError;
}

export async function generateStaticParams() {
  const menus = await getMenus();
  return menus.map((menu) => ({ id: menu.slug, }));
}
export default async function SingleDishPage({ params }) {
  const { id } = await params;
  const menus = await getMenus();
  const menu = menus.find((item) => item.slug === id );

  if (!menu) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <Link href="/menu"
        className="mb-6 inline-block text-sm font-medium text-gray-600 hover:text-black">
          ← Back to Menu
      </Link>
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
      <p className="mb-2 text-sm font-medium text-[#c9a96e]">
        {menu.category}
      </p>
      <h1 className="text-4xl font-bold text-gray-900">
        {menu.nameEn}
      </h1>
      <p className="mt-2 text-xl text-gray-500">
        {menu.nameAm}
      </p>
      <p className="mt-6 text-gray-600">
        {menu.description}
      </p>
      <p className="mt-6 text-2xl font-bold text-[#c9a96e]">
        {menu.priceETB} ETB
      </p>
      <div className="mt-6">
      <AddToCartButton menu={menu} />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="mt-10">
        <div>
          <p className="text-sm text-gray-500">
            Spice Level
          </p>
          <p className="font-semibold">
            {menu.spiceLevel}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            Servings
          </p>
          <p className="font-semibold">
            {menu.servings}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {menu.isSpecial && (
            <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800">
              Special
            </span>
          )}
          {menu.isFasting && (
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
              Fasting
            </span>
          )}
        </div>
      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">
          Ingredients
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-gray-600">
          {menu.ingredients.map((ingredient) => (
            <li key={ingredient}> {ingredient}  </li> ))}
        </ul>
      </div>
        </div>
      </div>
    </div>
  </main>
);
}
