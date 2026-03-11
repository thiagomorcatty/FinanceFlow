import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const documents = await prisma.document.findMany({
      include: {
        client: { select: { name: true } },
        process: { select: { serviceType: true } },
      },
      orderBy: { uploadedAt: "desc" },
    });
    return NextResponse.json(documents);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar documentos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const document = await prisma.document.create({
      data: {
        clientId: body.clientId,
        processId: body.processId || null,
        documentType: body.documentType,
        fileUrl: body.fileUrl,
      },
    });
    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar documento" }, { status: 500 });
  }
}
