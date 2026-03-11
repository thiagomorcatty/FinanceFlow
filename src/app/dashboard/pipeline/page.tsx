"use client";

import { useState } from "react";
import { Plus, GripVertical, User, Clock } from "lucide-react";

const stages = [
  { id: "NEW_LEAD", label: "Novo Lead", color: "border-t-slate-400" },
  { id: "DOCUMENTS_REQUESTED", label: "Documentos", color: "border-t-amber-400" },
  { id: "FINANCIAL_ANALYSIS", label: "Análise Financeira", color: "border-t-blue-400" },
  { id: "SIMULATION", label: "Simulação", color: "border-t-purple-400" },
  { id: "SUBMITTED_TO_BANKS", label: "Enviado aos Bancos", color: "border-t-indigo-400" },
  { id: "PROPOSAL_RECEIVED", label: "Proposta Recebida", color: "border-t-cyan-400" },
  { id: "CLIENT_DECISION", label: "Decisão do Cliente", color: "border-t-orange-400" },
  { id: "APPROVED", label: "Aprovado", color: "border-t-emerald-400" },
  { id: "CONTRACT_SIGNED", label: "Contrato Assinado", color: "border-t-teal-400" },
  { id: "COMPLETED", label: "Concluído", color: "border-t-green-400" },
];

const initialCards: Record<string, Array<{ id: string; client: string; type: string; amount: string; assignedTo: string; daysInStage: number }>> = {
  NEW_LEAD: [
    { id: "1", client: "Carlos Oliveira", type: "Contabilidade", amount: "—", assignedTo: "JP", daysInStage: 2 },
    { id: "2", client: "Luísa Martins", type: "Crédito Habitação", amount: "€200.000", assignedTo: "CM", daysInStage: 1 },
  ],
  DOCUMENTS_REQUESTED: [
    { id: "3", client: "Ana Ferreira", type: "Transferência Crédito", amount: "€180.000", assignedTo: "AR", daysInStage: 3 },
  ],
  FINANCIAL_ANALYSIS: [
    { id: "4", client: "João Silva", type: "Crédito Habitação", amount: "€250.000", assignedTo: "CM", daysInStage: 5 },
  ],
  SIMULATION: [
    { id: "5", client: "Pedro Costa", type: "Seguro Vida", amount: "€120/mês", assignedTo: "CM", daysInStage: 1 },
  ],
  SUBMITTED_TO_BANKS: [
    { id: "6", client: "Sofia Rodrigues", type: "Crédito Habitação", amount: "€320.000", assignedTo: "CM", daysInStage: 4 },
  ],
  PROPOSAL_RECEIVED: [
    { id: "7", client: "Catarina Lopes", type: "Crédito Pessoal", amount: "€8.000", assignedTo: "JP", daysInStage: 2 },
  ],
  CLIENT_DECISION: [],
  APPROVED: [
    { id: "8", client: "Maria Santos", type: "Crédito Pessoal", amount: "€15.000", assignedTo: "AR", daysInStage: 1 },
  ],
  CONTRACT_SIGNED: [
    { id: "9", client: "Rui Martins", type: "Seguro Automóvel", amount: "€65/mês", assignedTo: "AR", daysInStage: 0 },
  ],
  COMPLETED: [],
};

export default function PipelinePage() {
  const [cards] = useState(initialCards);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pipeline</h1>
          <p className="text-muted-foreground text-sm mt-1">Gestão visual dos processos financeiros</p>
        </div>
        <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-2.5 px-4 rounded-lg transition-all shadow-lg shadow-accent/25">
          <Plus size={18} />
          Novo Processo
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4" style={{ minWidth: "fit-content" }}>
          {stages.map((stage) => {
            const stageCards = cards[stage.id] || [];
            return (
              <div key={stage.id} className="w-72 flex-shrink-0">
                {/* Column Header */}
                <div className={`bg-white rounded-t-xl border-t-4 ${stage.color} px-4 py-3 border-x border-border`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">{stage.label}</h3>
                    <span className="bg-cards text-muted-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                      {stageCards.length}
                    </span>
                  </div>
                </div>

                {/* Column Body */}
                <div className="bg-cards/50 rounded-b-xl border-x border-b border-border p-2 space-y-2 min-h-[200px]">
                  {stageCards.map((card) => (
                    <div
                      key={card.id}
                      className="bg-white rounded-lg p-3 border border-border shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-medium text-foreground">{card.client}</h4>
                        <GripVertical size={14} className="text-muted-foreground/50" />
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{card.type}</p>
                      {card.amount !== "—" && (
                        <p className="text-sm font-semibold text-foreground mb-2">{card.amount}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock size={12} />
                          {card.daysInStage}d
                        </div>
                        <div className="w-6 h-6 rounded-full bg-active/10 flex items-center justify-center text-active text-xs font-semibold">
                          {card.assignedTo}
                        </div>
                      </div>
                    </div>
                  ))}

                  {stageCards.length === 0 && (
                    <div className="flex items-center justify-center h-24 text-xs text-muted-foreground/50">
                      Sem processos
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
