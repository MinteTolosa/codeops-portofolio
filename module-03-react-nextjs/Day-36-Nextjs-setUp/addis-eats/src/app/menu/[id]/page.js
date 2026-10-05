import { menus } from "../../../data/menus";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";


export async function generateStaticParams() {
  return menus.map((menu) => ({ id: menu.id.toString(),}));
}
export default async function SingleDishPage({ params }) {
  const { id } = await params;
  const menu = menus.find( (item) => item.id === parseInt(id) );
  // console.log(menu);
  if (!menu) {
    notFound();
  }
  return (
    <main className="min-h-screen bg-[#17130f] px-6 py-12 text-[#f5efe6]">
      <div className="mx-auto max-w-5xl">
        <Link href="/menu" className="mb-8 inline-block text-sm text-[#9e9589] transition hover:text-[#c9a96e]" >
          ← Back to Menu
        </Link>
        <div className="grid overflow-hidden rounded-2xl border border-[#6f6252]/30 bg-[#211b15] shadow-2xl md:grid-cols-2">
          <div className="p-4 md:p-6">
            <Image src={menu.image} alt={menu.name} width={600} height={600}
              className="h-80 w-full rounded-xl object-cover md:h-[450px]" />
          </div>
          <div className="flex flex-col justify-center p-7 md:p-10">
            <p className="text-sm uppercase tracking-[0.25em] text-[#c9a96e]">
              {menu.category}
            </p>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">
              {menu.name}
            </h1>
            <p className="mt-5 leading-relaxed text-[#b8afa3]">
              Enjoy the rich flavors of our {menu.name}, prepared with
              traditional Ethiopian ingredients and served with care.
            </p>
            <p className="mt-7 text-3xl font-semibold text-[#c9a96e]">
              {menu.price} ETB
            </p>
            <div className="mt-5">
              {menu.spicy 
              ? ( <span className="rounded-full border border-[#d98b6b]/40 bg-[#d98b6b]/10 px-4 py-2 text-sm text-[#d98b6b]">
                  🌶️ Spicy
                </span> ) 
              : ( <span className="rounded-full border border-[#a9b88f]/40 bg-[#a9b88f]/10 px-4 py-2 text-sm text-[#a9b88f]">
                  🌿 Mild
                </span>
              )}
            </div>
            <button className="mt-8 rounded-md bg-[#c9a96e] px-6 py-3 font-semibold text-[#17130f] transition hover:bg-[#dfc38d]">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}