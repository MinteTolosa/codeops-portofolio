
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const response = await fetch(process.env.MENU_API_URL);

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch menu data" },
        { status: 502 }
      );
    }
    const result = await response.json();
    const dishes = result.data;
    const dish = dishes.find((item) => String(item.id) === id || item.slug === id);
    console.log(dish);
    if (!dish) {
      return Response.json(
        { error: "Dish not found" },
        { status: 404 }
      );
    }
    return Response.json(dish);
  } catch (error) {
    return Response.json(
      { error: "Unable to connect to the menu service" },
      { status: 502 }
    );
  }
}
