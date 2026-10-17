
export async function GET() {
  try {
    const response = await fetch(process.env.MENU_API_URL);
    
    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch menu data" },
        { status: 502 }
      );
    }
    const result = await response.json();

    return Response.json(result.data);
  } catch (error) {
    return Response.json(
      { error: "Unable to connect to the menu service" },
      { status: 502 }
    );
  }
}
