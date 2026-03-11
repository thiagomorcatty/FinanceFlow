import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar utilizadores" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password || "",
        role: body.role || "CONSULTANT",
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "E-mail já registado" }, { status: 409 });
    }
    return NextResponse.json({ error: "Erro ao criar utilizador" }, { status: 500 });
  }
}
