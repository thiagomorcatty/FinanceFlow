import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const commissions = await prisma.commission.findMany({
      where: status ? { paymentStatus: status as any } : undefined,
      include: {
        process: {
          include: { client: { select: { name: true } } },
        },
      },
      orderBy: { processId: "desc" },
    });
    return NextResponse.json(commissions);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar comissões" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const commission = await prisma.commission.create({
      data: {
        processId: body.processId,
        institution: body.institution,
        commissionAmount: parseFloat(body.commissionAmount),
        paymentStatus: body.paymentStatus || "PENDING",
      },
    });
    return NextResponse.json(commission, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar comissão" }, { status: 500 });
  }
}
