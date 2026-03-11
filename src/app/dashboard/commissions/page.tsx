"use client";

import { useState } from "react";
import { Search, Plus, DollarSign, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const mockCommissions = [
  { id: "1", process: "Crédito Habitação – João Silva", institution: "Banco Millennium", amount: 2500, status: "PAID", paidDate: "2024-02-28" },
  { id: "2", process: "Crédito Pessoal – Maria Santos", institution: "Banco BPI", amount: 300, status: "PAID", paidDate: "2024-02-15" },
  { id: "3", process: "Crédito Habitação – Sofia Rodrigues", institution: "Santander", amount: 3200, status: "PENDING", paidDate: null },
  { id: "4", process: "Seguro Automóvel – Rui Martins", institution: "Fidelidade", amount: 150, status: "PAID", paidDate: "2024-02-20" },
  { id: "5", process: "Crédito Pessoal – Catarina Lopes", institution: "Novo Banco", amount: 180, status: "PENDING", paidDate: null },
  { id: "6", process: "Seguro Vida – Pedro Costa", institution: "Fidelidade", amount: 200, status: "PENDING", paidDate: null },
  { id: "7", process: "Transferência – Ana Ferreira", institution: "CGD", amount: 1800, status: "OVERDUE", paidDate: null },
];

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  PAID: { label: "Pago", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  PENDING: { label: "Pendente", color: "bg-amber-100 text-amber-700", icon: Clock },
  OVERDUE: { label: "Em Atraso", color: "bg-red-100 text-red-700", icon: AlertTriangle },
};

export default function CommissionsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? mockCommissions : mockCommissions.filter((c) => c.status === filter);

  const totalPaid = mockCommissions.filter((c) => c.status === "PAID").reduce((sum, c) => sum + c.amount, 0);
  const totalPending = mockCommissions.filter((c) => c.status === "PENDING").reduce((sum, c) => sum + c.amount, 0);
  const totalOverdue = mockCommissions.filter((c) => c.status === "OVERDUE").reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Comissões</h1>
          <p className="text-muted-foreground text-sm mt-1">Acompanhamento de comissões por processo</p>
        </div>
        <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-2.5 px-4 rounded-lg transition-all shadow-lg shadow-accent/25">
          <Plus size={18} />
          Registar Comissão
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-50"><CheckCircle size={20} className="text-emerald-600" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Total Recebido</p>
              <p className="text-xl font-bold text-foreground">€{totalPaid.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50"><Clock size={20} className="text-amber-600" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Pendente</p>
              <p className="text-xl font-bold text-foreground">€{totalPending.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-50"><AlertTriangle size={20} className="text-red-600" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Em Atraso</p>
              <p className="text-xl font-bold text-foreground">€{totalOverdue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "PAID", "PENDING", "OVERDUE"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === s ? "bg-active text-white shadow-lg shadow-active/25" : "bg-white text-muted-foreground border border-border hover:bg-cards"
            }`}
          >
            {s === "all" ? "Todas" : statusConfig[s].label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-cards/50">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Processo</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Instituição</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Valor</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Data Pagamento</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((comm) => {
                const st = statusConfig[comm.status];
                const StatusIcon = st.icon;
                return (
                  <tr key={comm.id} className="border-b border-border hover:bg-cards/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{comm.process}</td>
                    <td className="py-3 px-4 text-muted-foreground">{comm.institution}</td>
                    <td className="py-3 px-4 font-semibold text-foreground">€{comm.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium w-fit ${st.color}`}>
                        <StatusIcon size={12} />
                        {st.label}
                      </span>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell text-muted-foreground">{comm.paidDate || "—"}</td>
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
