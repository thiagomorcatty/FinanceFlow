"use client";

import { useState } from "react";
import { Search, Plus, FileText, ArrowUpRight } from "lucide-react";

const mockProcesses = [
  { id: "1", client: "João Silva", type: "Crédito Habitação", amount: 250000, status: "FINANCIAL_ANALYSIS", assignedTo: "Carlos Mendes", createdAt: "2024-01-15" },
  { id: "2", client: "Maria Santos", type: "Crédito Pessoal", amount: 15000, status: "APPROVED", assignedTo: "Ana Ribeiro", createdAt: "2024-01-18" },
  { id: "3", client: "Pedro Costa", type: "Seguro Vida", amount: 0, status: "SIMULATION", assignedTo: "Carlos Mendes", createdAt: "2024-01-20" },
  { id: "4", client: "Ana Ferreira", type: "Transferência Crédito", amount: 180000, status: "DOCUMENTS_REQUESTED", assignedTo: "Ana Ribeiro", createdAt: "2024-02-01" },
  { id: "5", client: "Carlos Oliveira", type: "Contabilidade", amount: 0, status: "NEW_LEAD", assignedTo: "João Pereira", createdAt: "2024-02-05" },
  { id: "6", client: "Sofia Rodrigues", type: "Crédito Habitação", amount: 320000, status: "SUBMITTED_TO_BANKS", assignedTo: "Carlos Mendes", createdAt: "2024-02-08" },
  { id: "7", client: "Rui Martins", type: "Seguro Automóvel", amount: 0, status: "CONTRACT_SIGNED", assignedTo: "Ana Ribeiro", createdAt: "2024-02-10" },
  { id: "8", client: "Catarina Lopes", type: "Crédito Pessoal", amount: 8000, status: "PROPOSAL_RECEIVED", assignedTo: "João Pereira", createdAt: "2024-02-12" },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  NEW_LEAD: { label: "Novo Lead", color: "bg-slate-100 text-slate-700" },
  DOCUMENTS_REQUESTED: { label: "Documentos", color: "bg-amber-100 text-amber-700" },
  FINANCIAL_ANALYSIS: { label: "Análise Financeira", color: "bg-blue-100 text-blue-700" },
  SIMULATION: { label: "Simulação", color: "bg-purple-100 text-purple-700" },
  SUBMITTED_TO_BANKS: { label: "Enviado aos Bancos", color: "bg-indigo-100 text-indigo-700" },
  PROPOSAL_RECEIVED: { label: "Proposta Recebida", color: "bg-cyan-100 text-cyan-700" },
  CLIENT_DECISION: { label: "Decisão do Cliente", color: "bg-orange-100 text-orange-700" },
  APPROVED: { label: "Aprovado", color: "bg-emerald-100 text-emerald-700" },
  CONTRACT_SIGNED: { label: "Contrato Assinado", color: "bg-teal-100 text-teal-700" },
  COMPLETED: { label: "Concluído", color: "bg-green-100 text-green-700" },
};

export default function ProcessesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = mockProcesses.filter((p) => {
    const matchSearch = p.client.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || p.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Processos</h1>
          <p className="text-muted-foreground text-sm mt-1">{mockProcesses.length} processos registados</p>
        </div>
        <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-2.5 px-4 rounded-lg transition-all shadow-lg shadow-accent/25">
          <Plus size={18} />
          Novo Processo
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por cliente..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-active/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2.5 bg-white border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-active/20"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">Todos os tipos</option>
          <option value="Crédito Habitação">Crédito Habitação</option>
          <option value="Crédito Pessoal">Crédito Pessoal</option>
          <option value="Transferência Crédito">Transferência Crédito</option>
          <option value="Seguro Vida">Seguro Vida</option>
          <option value="Contabilidade">Contabilidade</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-cards/50">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cliente</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tipo</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Valor</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden lg:table-cell">Consultor</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((proc) => {
                const st = statusLabels[proc.status] || { label: proc.status, color: "bg-gray-100 text-gray-700" };
                return (
                  <tr key={proc.id} className="border-b border-border hover:bg-cards/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{proc.client}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText size={14} />
                        {proc.type}
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell font-medium text-foreground">
                      {proc.amount > 0 ? `€${proc.amount.toLocaleString()}` : "—"}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${st.color}`}>{st.label}</span>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell text-muted-foreground">{proc.assignedTo}</td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-active hover:underline text-xs font-medium flex items-center gap-1 ml-auto">
                        Ver <ArrowUpRight size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
