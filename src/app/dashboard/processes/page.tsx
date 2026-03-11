"use client";

import { useState, useEffect, FormEvent } from "react";
import { Plus, X, Trash2, ArrowUpRight, FileText, Filter } from "lucide-react";

const statusLabels: Record<string, { label: string; color: string }> = {
  NEW_LEAD: { label: "Novo Lead", color: "bg-slate-100 text-slate-700" },
  DOCUMENTS_REQUESTED: { label: "Documentos", color: "bg-amber-100 text-amber-700" },
  FINANCIAL_ANALYSIS: { label: "Análise", color: "bg-blue-100 text-blue-700" },
  SIMULATION: { label: "Simulação", color: "bg-purple-100 text-purple-700" },
  SUBMITTED_TO_BANKS: { label: "Enviado Bancos", color: "bg-indigo-100 text-indigo-700" },
  PROPOSAL_RECEIVED: { label: "Proposta Recebida", color: "bg-cyan-100 text-cyan-700" },
  CLIENT_DECISION: { label: "Decisão Cliente", color: "bg-orange-100 text-orange-700" },
  APPROVED: { label: "Aprovado", color: "bg-emerald-100 text-emerald-700" },
  CONTRACT_SIGNED: { label: "Contrato Assinado", color: "bg-teal-100 text-teal-700" },
  COMPLETED: { label: "Concluído", color: "bg-green-100 text-green-700" },
};

const serviceTypeLabels: Record<string, string> = {
  MORTGAGE: "Crédito Habitação",
  PERSONAL_CREDIT: "Crédito Pessoal",
  INSURANCE: "Seguros",
  ACCOUNTING: "Contabilidade",
  CREDIT_TRANSFER: "Transferência Crédito"
};

export default function ProcessesPage() {
  const [processes, setProcesses] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    clientId: "",
    serviceType: "MORTGAGE",
    requestedAmount: "",
  });

  const fetchProcesses = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (typeFilter !== "all") params.append("serviceType", typeFilter);
      if (statusFilter !== "all") params.append("status", statusFilter);
      
      const res = await fetch(`/api/processes?${params.toString()}`);
      const data = await res.json();
      setProcesses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await fetch('/api/clients');
      const data = await res.json();
      setClients(Array.isArray(data) ? data : []);
    } catch (err) {}
  };

  useEffect(() => {
    fetchProcesses();
  }, [typeFilter, statusFilter]);

  useEffect(() => {
    if (isModalOpen && clients.length === 0) {
      fetchClients();
    }
  }, [isModalOpen, clients.length]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.clientId) {
      alert("Por favor, selecione um cliente.");
      return;
    }
    
    setSubmitting(true);
    try {
      const res = await fetch("/api/processes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          requestedAmount: formData.requestedAmount ? parseFloat(formData.requestedAmount) : null,
        }),
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ clientId: "", serviceType: "MORTGAGE", requestedAmount: "" });
        fetchProcesses();
      }
    } catch (error) {
      console.error("Erro ao salvar processo", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem a certeza que deseja eliminar este processo?")) return;
    try {
      await fetch(`/api/processes/${id}`, { method: "DELETE" });
      fetchProcesses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Processos</h1>
          <p className="text-muted-foreground text-sm mt-1">{processes.length} processos registados</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-2.5 px-4 rounded-lg transition-all shadow-lg shadow-accent/25"
        >
          <Plus size={18} />
          Novo Processo
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <select
          className="px-4 py-2.5 bg-white border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-active/20"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">Todos os tipos de serviço</option>
          {Object.entries(serviceTypeLabels).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
        
        <select
          className="px-4 py-2.5 bg-white border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-active/20"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Todos os estados</option>
          {Object.entries(statusLabels).map(([key, obj]) => (
             <option key={key} value={key}>{obj.label}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-cards/50">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cliente</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tipo de Serviço</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Valor</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status do Pipeline</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden lg:table-cell">Consultor</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-muted-foreground">Carregando processos...</td>
                </tr>
              ) : processes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-muted-foreground">Nenhum processo encontrado.</td>
                 </tr>
              ) : (
                processes.map((proc) => {
                  const st = statusLabels[proc.status] || { label: proc.status, color: "bg-gray-100 text-gray-700" };
                  return (
                    <tr key={proc.id} className="border-b border-border hover:bg-cards/30 transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">{proc.client?.name || "Desconhecido"}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <FileText size={14} />
                          {serviceTypeLabels[proc.serviceType] || proc.serviceType}
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell font-medium text-foreground">
                        {proc.requestedAmount ? \`€\${proc.requestedAmount.toLocaleString()}\` : "—"}
                      </td>
                      <td className="py-3 px-4">
                        <span className={\`text-xs px-2.5 py-1 rounded-full font-medium \${st.color}\`}>{st.label}</span>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell text-muted-foreground">{proc.assignedUser?.name || "Não atribuído"}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2 text-right">
                           <button className="text-active hover:underline text-xs font-medium flex items-center gap-1">
                            Ver <ArrowUpRight size={13} />
                          </button>
                          <button onClick={() => handleDelete(proc.id)} className="p-1 rounded text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Novo Processo */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Novo Processo</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5">
              <form id="process-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Cliente *</label>
                  <select 
                    required 
                    className="w-full px-3 py-2 border border-input rounded-lg text-sm" 
                    value={formData.clientId} 
                    onChange={(e) => setFormData({...formData, clientId: e.target.value})}
                  >
                    <option value="" disabled>Selecione um cliente...</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Tipo de Serviço *</label>
                  <select 
                    required 
                    className="w-full px-3 py-2 border border-input rounded-lg text-sm" 
                    value={formData.serviceType} 
                    onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                  >
                    {Object.entries(serviceTypeLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Valor Solicitado (€)</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    placeholder="Ex: 150000"
                    className="w-full px-3 py-2 border border-input rounded-lg text-sm" 
                    value={formData.requestedAmount} 
                    onChange={(e) => setFormData({...formData, requestedAmount: e.target.value})} 
                  />
                </div>
              </form>
            </div>

            <div className="p-5 border-t border-border bg-cards/50 flex items-center justify-end gap-3 rounded-b-xl">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                form="process-form"
                disabled={submitting}
                className="px-4 py-2 text-sm font-semibold bg-active text-white rounded-lg hover:bg-active/90 transition-all disabled:opacity-70 flex items-center gap-2"
              >
                {submitting ? "A criar..." : "Criar Processo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
