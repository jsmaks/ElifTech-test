import { db } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 8;

  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";
  const searchQuery = searchParams.get("search") || "";

  const validSortFields = ["title", "description", "createdAt"];
  const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";

  const events = await db.eventBoard.findMany({
    where: {
      OR: [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
      ],
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { [sortField]: sortOrder },
  });

  const totalEvents = await db.eventBoard.count({
    where: {
      OR: [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
      ],
    },
  });

  return NextResponse.json({
    events,
    totalPages: Math.ceil(totalEvents / pageSize),
    currentPage: page,
  });
}

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const page = parseInt(searchParams.get("page") || "1");
//   const pageSize = 12;
//   const sortBy = searchParams.get("sortBy") || "createdAt";
//   const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";
//   const searchQuery = searchParams.get("search") || "";

//   const startDate = searchParams.get("startDate") || "";
//   const endDate = searchParams.get("endDate") || "";

//   const validSortFields = ["title", "description", "createdAt"];
//   const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const condition: any = {
//     OR: [
//       { title: { contains: searchQuery, mode: "insensitive" } },
//       { description: { contains: searchQuery, mode: "insensitive" } },
//     ],
//   };
//   // 2024-09-25T11:59:23.039Z
//   if (startDate && endDate) {
//     condition.createdAt = {
//       gte: new Date(startDate),
//       lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
//     };
//   } else if (startDate) {
//     condition.createdAt = { gte: new Date(startDate) };
//   } else if (endDate) {
//     condition.createdAt = {
//       lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)),
//     };
//   }

//   const events = await prisma.eventList.findMany({
//     where: condition,
//     skip: (page - 1) * pageSize,
//     take: pageSize,
//     orderBy: { [sortField]: sortOrder },
//   });

//   const totalEvents = await prisma.eventList.count({
//     where: condition,
//   });

//   return NextResponse.json({
//     events,
//     totalPages: Math.ceil(totalEvents / pageSize),
//     currentPage: page,
//   });
// }

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
