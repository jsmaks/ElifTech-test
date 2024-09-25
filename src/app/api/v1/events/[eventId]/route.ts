import { db } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const eventBoard = await db.eventBoard.findUnique({
      where: { id: params.eventId },
    });

    if (eventBoard) {
      return NextResponse.json(
        { exists: true },

        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "No EventBoard found with id " + params.eventId },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, eventId } = body;

    if (!name || !email || !eventId) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await db.list.create({
      data: {
        name: name,
        email: email,
        eventId: eventId,
      },
    });

    return new NextResponse(JSON.stringify({ message: "Success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating list entry:", error);
    return new NextResponse(JSON.stringify({ error: "Webhook error" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
