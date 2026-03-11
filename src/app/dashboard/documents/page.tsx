"use client";

import { useState } from "react";
import { Upload, FileText, Image, File, Trash2, Download, Search, Filter } from "lucide-react";

const mockDocs = [
  { id: "1", name: "CC_JoaoSilva.pdf", type: "Cartão Cidadão", client: "João Silva", process: "Crédito Habitação", size: "2.1 MB", date: "2024-02-10" },
  { id: "2", name: "IRS_2023_JoaoSilva.pdf", type: "Declaração IRS", client: "João Silva", process: "Crédito Habitação", size: "450 KB", date: "2024-02-10" },
  { id: "3", name: "Recibo_Vencimento_Jan.pdf", type: "Recibo de Vencimento", client: "João Silva", process: "Crédito Habitação", size: "280 KB", date: "2024-02-11" },
  { id: "4", name: "Extrato_Bancario.pdf", type: "Extrato Bancário", client: "Maria Santos", process: "Crédito Pessoal", size: "1.5 MB", date: "2024-02-05" },
  { id: "5", name: "CC_AnaFerreira.pdf", type: "Cartão Cidadão", client: "Ana Ferreira", process: "Transferência Crédito", size: "1.8 MB", date: "2024-02-01" },
  { id: "6", name: "Contrato_Seguro.pdf", type: "Contrato", client: "Rui Martins", process: "Seguro Automóvel", size: "3.2 MB", date: "2024-02-14" },
];

const docTypeIcons: Record<string, string> = {
  "Cartão Cidadão": "🪪",
  "Declaração IRS": "📋",
  "Recibo de Vencimento": "💰",
  "Extrato Bancário": "🏦",
  "Contrato": "📝",
};

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = mockDocs.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.client.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || d.type === typeFilter;
    return matchSearch && matchType;
  });

  const docTypes = [...new Set(mockDocs.map((d) => d.type))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Documentos</h1>
          <p className="text-muted-foreground text-sm mt-1">{mockDocs.length} documentos carregados</p>
        </div>
        <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-2.5 px-4 rounded-lg transition-all shadow-lg shadow-accent/25">
          <Upload size={18} />
          Carregar Documento
        </button>
      </div>

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-white hover:border-active/30 transition-colors cursor-pointer">
        <Upload size={32} className="mx-auto text-muted-foreground/50 mb-3" />
        <p className="text-sm text-muted-foreground mb-1">Arraste ficheiros aqui ou clique para carregar</p>
        <p className="text-xs text-muted-foreground/70">PDF, JPG, PNG — Max 10MB</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar documentos..."
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
          {docTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((doc) => (
          <div key={doc.id} className="bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow group">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-lg bg-cards text-2xl flex-shrink-0">
                {docTypeIcons[doc.type] || "📄"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{doc.type}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span>{doc.client}</span>
                  <span>•</span>
                  <span>{doc.size}</span>
                </div>
                <p className="text-xs text-muted-foreground/70 mt-1">{doc.date}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex-1 text-xs py-1.5 bg-cards text-foreground rounded-lg font-medium hover:bg-active/10 hover:text-active transition-colors flex items-center justify-center gap-1">
                <Download size={13} /> Download
              </button>
              <button className="text-xs py-1.5 px-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
