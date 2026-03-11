import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const serviceType = searchParams.get("serviceType");

    const processes = await prisma.process.findMany({
      where: {
        ...(status ? { status: status as any } : {}),
        ...(serviceType ? { serviceType: serviceType as any } : {}),
      },
      include: {
        client: { select: { name: true, email: true } },
        assignedUser: { select: { name: true } },
        _count: { select: { offers: true, tasks: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(processes);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar processos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const process = await prisma.process.create({
      data: {
        clientId: body.clientId,
        serviceType: body.serviceType,
        requestedAmount: body.requestedAmount ? parseFloat(body.requestedAmount) : null,
        status: body.status || "NEW_LEAD",
        assignedUserId: body.assignedUserId || null,
      },
    });
    return NextResponse.json(process, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar processo" }, { status: 500 });
  }
}
