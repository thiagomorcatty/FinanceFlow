import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const note = await prisma.note.create({
      data: {
        clientId: body.clientId || null,
        processId: body.processId || null,
        content: body.content,
      },
    });
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar nota" }, { status: 500 });
  }
}
