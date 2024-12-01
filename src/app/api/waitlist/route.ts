export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    // Validate input
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ name, email }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding user:", error);
    return new Response(JSON.stringify({ error: "Failed to add user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
