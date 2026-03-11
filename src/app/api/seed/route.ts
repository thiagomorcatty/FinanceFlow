import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Create admin user in database
    const adminEmail = "admin@email.com";

    const existing = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existing) {
      return NextResponse.json({ message: "Admin já existe", user: existing });
    }

    const admin = await prisma.user.create({
      data: {
        name: "Administrador",
        email: adminEmail,
        password: "",
        role: "ADMIN",
      },
    });

    return NextResponse.json({ message: "Admin criado com sucesso", user: admin }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar admin" }, { status: 500 });
  }
}
