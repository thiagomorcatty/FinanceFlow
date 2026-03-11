import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";

    const clients = await prisma.client.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined,
      include: {
        _count: { select: { processes: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar clientes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = await prisma.client.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        taxNumber: body.taxNumber,
        address: body.address,
        profession: body.profession,
        monthlyIncome: body.monthlyIncome ? parseFloat(body.monthlyIncome) : null,
        maritalStatus: body.maritalStatus,
        dependents: body.dependents ? parseInt(body.dependents) : 0,
      },
    });
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar cliente" }, { status: 500 });
  }
}
