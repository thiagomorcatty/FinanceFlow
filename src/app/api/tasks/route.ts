import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const tasks = await prisma.task.findMany({
      where: status ? { status: status as any } : undefined,
      include: {
        process: {
          include: { client: { select: { name: true } } },
        },
        assignedUser: { select: { name: true } },
      },
      orderBy: { dueDate: "asc" },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar tarefas" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const task = await prisma.task.create({
      data: {
        processId: body.processId || null,
        assignedUserId: body.assignedUserId || null,
        description: body.description,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        status: body.status || "PENDING",
      },
    });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar tarefa" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const task = await prisma.task.update({
      where: { id: body.id },
      data: {
        description: body.description,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
        status: body.status,
        assignedUserId: body.assignedUserId,
      },
    });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar tarefa" }, { status: 500 });
  }
}
