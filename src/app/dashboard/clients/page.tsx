"use client";

import { useState } from "react";
import { Search, Plus, Filter, Mail, Phone, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";

const mockClients = [
  { id: "1", name: "João Silva", email: "joao@email.com", phone: "+351 912 345 678", taxNumber: "123456789", profession: "Engenheiro", monthlyIncome: 2500, status: "Ativo", processes: 3 },
  { id: "2", name: "Maria Santos", email: "maria@email.com", phone: "+351 923 456 789", taxNumber: "987654321", profession: "Professora", monthlyIncome: 1800, status: "Ativo", processes: 1 },
  { id: "3", name: "Pedro Costa", email: "pedro@email.com", phone: "+351 934 567 890", taxNumber: "456789123", profession: "Médico", monthlyIncome: 4200, status: "Lead", processes: 0 },
  { id: "4", name: "Ana Ferreira", email: "ana@email.com", phone: "+351 945 678 901", taxNumber: "789123456", profession: "Advogada", monthlyIncome: 3500, status: "Ativo", processes: 2 },
  { id: "5", name: "Carlos Oliveira", email: "carlos@email.com", phone: "+351 956 789 012", taxNumber: "321654987", profession: "Empresário", monthlyIncome: 5000, status: "Lead", processes: 0 },
  { id: "6", name: "Sofia Rodrigues", email: "sofia@email.com", phone: "+351 967 890 123", taxNumber: "654987321", profession: "Contabilista", monthlyIncome: 2200, status: "Ativo", processes: 4 },
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockClients.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground text-sm mt-1">{mockClients.length} clientes registados</p>
        </div>
        <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-2.5 px-4 rounded-lg transition-all shadow-lg shadow-accent/25">
          <Plus size={18} />
          Novo Cliente
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-active/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2.5 bg-white border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-active/20"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Todos os status</option>
          <option value="Ativo">Ativo</option>
          <option value="Lead">Lead</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-cards/50">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nome</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Contato</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden lg:table-cell">Profissão</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden lg:table-cell">Rendimento</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Processos</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((client) => (
                <tr key={client.id} className="border-b border-border hover:bg-cards/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-active/10 flex items-center justify-center text-active font-semibold text-sm">
                        {client.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.taxNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <div className="space-y-1">
                      <p className="flex items-center gap-1.5 text-muted-foreground"><Mail size={13} />{client.email}</p>
                      <p className="flex items-center gap-1.5 text-muted-foreground"><Phone size={13} />{client.phone}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell text-muted-foreground">{client.profession}</td>
                  <td className="py-3 px-4 hidden lg:table-cell font-medium text-foreground">€{client.monthlyIncome.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${client.status === "Ativo" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-cards text-foreground text-xs font-medium px-2 py-1 rounded">{client.processes}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded hover:bg-cards transition-colors text-muted-foreground hover:text-foreground"><Eye size={16} /></button>
                      <button className="p-1.5 rounded hover:bg-cards transition-colors text-muted-foreground hover:text-foreground"><Edit size={16} /></button>
                      <button className="p-1.5 rounded hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
