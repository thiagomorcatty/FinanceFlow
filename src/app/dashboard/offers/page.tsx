"use client";

import { useState } from "react";
import { Search, Plus, Building2, TrendingDown, CheckCircle, XCircle, Clock } from "lucide-react";

const mockOffers = [
  { id: "1", process: "João Silva – Crédito Habitação", institution: "Banco Millennium", product: "Habitação Taxa Variável", rate: 3.2, monthly: 980, status: "PENDING", createdAt: "2024-02-10" },
  { id: "2", process: "João Silva – Crédito Habitação", institution: "CGD", product: "Habitação Taxa Mista", rate: 3.5, monthly: 1020, status: "PENDING", createdAt: "2024-02-11" },
  { id: "3", process: "Maria Santos – Crédito Pessoal", institution: "Banco BPI", product: "Crédito Pessoal", rate: 7.5, monthly: 290, status: "ACCEPTED", createdAt: "2024-02-05" },
  { id: "4", process: "Sofia Rodrigues – Crédito Habitação", institution: "Santander", product: "Habitação Taxa Fixa", rate: 3.8, monthly: 1450, status: "PENDING", createdAt: "2024-02-12" },
  { id: "5", process: "Catarina Lopes – Crédito Pessoal", institution: "Novo Banco", product: "Crédito Pessoal", rate: 8.1, monthly: 175, status: "REJECTED", createdAt: "2024-01-28" },
  { id: "6", process: "Pedro Costa – Seguro Vida", institution: "Fidelidade", product: "Seguro Vida Plus", rate: 0, monthly: 45, status: "PENDING", createdAt: "2024-02-14" },
];

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
  PENDING: { label: "Pendente", color: "bg-amber-100 text-amber-700", icon: Clock },
  ACCEPTED: { label: "Aceite", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  REJECTED: { label: "Rejeitada", color: "bg-red-100 text-red-700", icon: XCircle },
  EXPIRED: { label: "Expirada", color: "bg-gray-100 text-gray-700", icon: Clock },
};

export default function OffersPage() {
  const [search, setSearch] = useState("");

  const filtered = mockOffers.filter((o) =>
    o.process.toLowerCase().includes(search.toLowerCase()) ||
    o.institution.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Propostas</h1>
          <p className="text-muted-foreground text-sm mt-1">Propostas recebidas de bancos e seguradoras</p>
        </div>
        <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-2.5 px-4 rounded-lg transition-all shadow-lg shadow-accent/25">
          <Plus size={18} />
          Nova Proposta
        </button>
      </div>

      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar por processo ou instituição..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-active/20"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Offer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((offer) => {
          const st = statusConfig[offer.status];
          const StatusIcon = st.icon;
          return (
            <div key={offer.id} className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-active/10">
                    <Building2 size={18} className="text-active" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{offer.institution}</h3>
                    <p className="text-xs text-muted-foreground">{offer.product}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${st.color}`}>
                  <StatusIcon size={12} />
                  {st.label}
                </span>
              </div>

              <p className="text-xs text-muted-foreground mb-3">{offer.process}</p>

              <div className="grid grid-cols-2 gap-3">
                {offer.rate > 0 && (
                  <div className="bg-cards rounded-lg p-2.5">
                    <p className="text-xs text-muted-foreground">Taxa</p>
                    <p className="text-lg font-bold text-foreground">{offer.rate}%</p>
                  </div>
                )}
                <div className="bg-cards rounded-lg p-2.5">
                  <p className="text-xs text-muted-foreground">Mensalidade</p>
                  <p className="text-lg font-bold text-foreground">€{offer.monthly}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                {offer.status === "PENDING" && (
                  <>
                    <button className="flex-1 text-xs py-1.5 bg-emerald-50 text-emerald-700 rounded-lg font-medium hover:bg-emerald-100 transition-colors">Aceitar</button>
                    <button className="flex-1 text-xs py-1.5 bg-red-50 text-red-700 rounded-lg font-medium hover:bg-red-100 transition-colors">Rejeitar</button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
