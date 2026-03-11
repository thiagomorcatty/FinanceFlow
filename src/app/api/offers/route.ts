import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      include: {
        process: {
          include: { client: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(offers);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar propostas" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const offer = await prisma.offer.create({
      data: {
        processId: body.processId,
        institutionName: body.institutionName,
        productType: body.productType,
        interestRate: body.interestRate ? parseFloat(body.interestRate) : null,
        monthlyPayment: body.monthlyPayment ? parseFloat(body.monthlyPayment) : null,
        status: body.status || "PENDING",
      },
    });
    return NextResponse.json(offer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar proposta" }, { status: 500 });
  }
}
