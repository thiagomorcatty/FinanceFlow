import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const process = await prisma.process.findUnique({
      where: { id: params.id },
      include: {
        client: true,
        assignedUser: true,
        offers: { orderBy: { createdAt: "desc" } },
        documents: { orderBy: { uploadedAt: "desc" } },
        commissions: true,
        tasks: true,
        notes: { orderBy: { createdAt: "desc" } },
      },
    });
    if (!process) {
      return NextResponse.json({ error: "Processo não encontrado" }, { status: 404 });
    }
    return NextResponse.json(process);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar processo" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const process = await prisma.process.update({
      where: { id: params.id },
      data: {
        serviceType: body.serviceType,
        requestedAmount: body.requestedAmount ? parseFloat(body.requestedAmount) : undefined,
        status: body.status,
        assignedUserId: body.assignedUserId,
      },
    });
    return NextResponse.json(process);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar processo" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.process.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Processo eliminado" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao eliminar processo" }, { status: 500 });
  }
}
