"use client";

import { useState } from "react";
import { Plus, CheckCircle, Clock, AlertCircle, User, Calendar } from "lucide-react";

const mockTasks = [
  { id: "1", description: "Solicitar documentos em falta ao João Silva", process: "Crédito Habitação – João Silva", assignedTo: "Carlos Mendes", dueDate: "2024-02-15", status: "PENDING" },
  { id: "2", description: "Submeter processo ao Millennium", process: "Crédito Habitação – João Silva", assignedTo: "Carlos Mendes", dueDate: "2024-02-18", status: "IN_PROGRESS" },
  { id: "3", description: "Follow up com Maria Santos sobre decisão", process: "Crédito Pessoal – Maria Santos", assignedTo: "Ana Ribeiro", dueDate: "2024-02-14", status: "COMPLETED" },
  { id: "4", description: "Enviar simulação ao Pedro Costa", process: "Seguro Vida – Pedro Costa", assignedTo: "Carlos Mendes", dueDate: "2024-02-20", status: "PENDING" },
  { id: "5", description: "Preparar documentação para transferência de crédito", process: "Transferência – Ana Ferreira", assignedTo: "Ana Ribeiro", dueDate: "2024-02-16", status: "IN_PROGRESS" },
  { id: "6", description: "Contactar Fidelidade para seguro vida", process: "Seguro Vida – Pedro Costa", assignedTo: "João Pereira", dueDate: "2024-02-22", status: "PENDING" },
  { id: "7", description: "Arquivar contrato do Rui Martins", process: "Seguro Automóvel – Rui Martins", assignedTo: "Ana Ribeiro", dueDate: "2024-02-13", status: "COMPLETED" },
  { id: "8", description: "Reunir documentos fiscais da Sofia Rodrigues", process: "Crédito Habitação – Sofia Rodrigues", assignedTo: "Carlos Mendes", dueDate: "2024-02-19", status: "PENDING" },
];

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: typeof Clock }> = {
  PENDING: { label: "Pendente", color: "text-amber-700", bgColor: "bg-amber-100", icon: Clock },
  IN_PROGRESS: { label: "Em Curso", color: "text-blue-700", bgColor: "bg-blue-100", icon: AlertCircle },
  COMPLETED: { label: "Concluída", color: "text-emerald-700", bgColor: "bg-emerald-100", icon: CheckCircle },
};

export default function TasksPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? mockTasks : mockTasks.filter((t) => t.status === filter);

  const counts = {
    all: mockTasks.length,
    PENDING: mockTasks.filter((t) => t.status === "PENDING").length,
    IN_PROGRESS: mockTasks.filter((t) => t.status === "IN_PROGRESS").length,
    COMPLETED: mockTasks.filter((t) => t.status === "COMPLETED").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tarefas</h1>
          <p className="text-muted-foreground text-sm mt-1">Gestão de tarefas internas</p>
        </div>
        <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-2.5 px-4 rounded-lg transition-all shadow-lg shadow-accent/25">
          <Plus size={18} />
          Nova Tarefa
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "PENDING", "IN_PROGRESS", "COMPLETED"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === s
                ? "bg-active text-white shadow-lg shadow-active/25"
                : "bg-white text-muted-foreground border border-border hover:bg-cards"
            }`}
          >
            {s === "all" ? "Todas" : statusConfig[s].label}
            <span className="ml-2 text-xs opacity-70">({counts[s]})</span>
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filtered.map((task) => {
          const st = statusConfig[task.status];
          const StatusIcon = st.icon;
          return (
            <div key={task.id} className="bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <button className={`mt-0.5 p-1 rounded-full ${st.bgColor} flex-shrink-0`}>
                  <StatusIcon size={16} className={st.color} />
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${task.status === "COMPLETED" ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {task.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{task.process}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <User size={12} />
                      {task.assignedTo}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar size={12} />
                      {task.dueDate}
                    </span>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${st.bgColor} ${st.color} flex-shrink-0`}>
                  {st.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
