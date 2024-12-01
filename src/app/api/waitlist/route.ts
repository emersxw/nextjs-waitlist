import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    const headersList = await headers();
    const ipAddress = headersList.get("x-forwarded-for") || "unknown";

    // Validate input
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const user = await prisma.waitlistUser.create({
        data: {
          name,
          email,
          ipAddress,
          projectName: "inquitab",
        },
      });

      return new Response(
        JSON.stringify({ name: user.name, email: user.email }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      // do nothing for now
      throw error;
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return new Response(JSON.stringify({ error: "Failed to add user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
