const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const MENU_API = "https://addis-eats-backend.onrender.com/menu/";

export default async function sitemap() {
  const staticRoutes = [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/menu`,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  try {
    const response = await fetch(MENU_API);

    if (!response.ok) {
      return staticRoutes;
    }

    const result = await response.json();
    const dishes = result.data || [];

    const dishRoutes = dishes.map((dish) => ({
      url: `${SITE_URL}/menu/${dish.slug || dish.id}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...dishRoutes];
  } catch {
    return staticRoutes;
  }
}