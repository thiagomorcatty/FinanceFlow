import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const banks = await prisma.bank.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(banks);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar bancos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bank = await prisma.bank.create({
      data: {
        name: body.name,
        contactEmail: body.contactEmail,
        commissionPercentage: body.commissionPercentage ? parseFloat(body.commissionPercentage) : null,
      },
    });
    return NextResponse.json(bank, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar banco" }, { status: 500 });
  }
}
