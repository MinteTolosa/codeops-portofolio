import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#17130f] text-[#f5efe6]">
      <Navbar />
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#c9a96e]">
              Welcome to Addis-Eats
            </p>
            <h1 className="max-w-xl text-5xl font-bold leading-tight md:text-6xl">
              The Taste of
              <span className="block text-[#c9a96e]">
                Ethiopia
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#b8afa3]">
              Discover the rich flavors of Ethiopian cuisine, prepared with
              traditional ingredients and served with the warmth of Ethiopian
              hospitality.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/menu" className="rounded-md bg-[#c9a96e] px-7 py-3 font-semibold text-[#17130f] transition hover:bg-[#dfc38d]">
                Explore Our Menu
              </Link>
              <Link href="/menu" className="rounded-md border border-[#6f6252] px-7 py-3 font-semibold text-[#f5efe6] transition hover:border-[#c9a96e] hover:text-[#c9a96e]">
                View Dishes
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="rounded-2xl border border-[#6f6252]/40 bg-[#211b15] p-3 shadow-2xl">
              <Image src="/images/bozena-shiro.jpg" alt="Traditional Ethiopian food"
                width={550}
                height={550}
                className="h-[350px] w-full max-w-[500px] rounded-xl object-cover md:h-[450px]"/>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-6xl border-t border-[#6f6252]/30" />
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-10 text-center md:grid-cols-3">
          <div>
            <div className="mb-4 text-3xl text-[#c9a96e]">
              ✦
            </div>
            <h2 className="text-xl font-semibold">
              Authentic Flavors
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#9e9589]">
              Traditional recipes inspired by the rich culinary heritage
              of Ethiopia.
            </p>
          </div>
          <div>
            <div className="mb-4 text-3xl text-[#c9a96e]">
              ✦
            </div>
            <h2 className="text-xl font-semibold">
              Fresh Ingredients
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#9e9589]">
              Carefully selected ingredients prepared with attention to
              quality and flavor.
            </p>
          </div>
  <div>
    <div className="mb-4 text-3xl text-[#c9a96e]">
      ✦
    </div>
      <h2 className="text-xl font-semibold">
        Ethiopian Hospitality
      </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#9e9589]">
           A warm dining experience inspired by Ethiopian culture
          and hospitality.
        </p>
    </div>        
    </div>
  </section>
  </main>
  );
}
