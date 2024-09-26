import { db } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 8;

  const events = await db.eventBoard.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: "desc" },
  });

  const totalEvents = await db.eventBoard.count();

  return NextResponse.json({
    events,
    totalPages: Math.ceil(totalEvents / pageSize),
    currentPage: page,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { title, description } = body;

    if (!title || !description) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await db.eventBoard.create({
      data: {
        title: title,
        description: description,
        list: {
          create: [],
        },
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
