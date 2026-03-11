"use client";

import { useState, useEffect, FormEvent } from "react";
import { Search, Plus, Filter, Mail, Phone, MoreVertical, Eye, Edit, Trash2, X } from "lucide-react";

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    taxNumber: "",
    profession: "",
    monthlyIncome: "",
    maritalStatus: "Solteiro",
    dependents: "0",
    address: ""
  });

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/clients?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setClients(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchClients();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          monthlyIncome: formData.monthlyIncome ? parseFloat(formData.monthlyIncome) : null,
          dependents: parseInt(formData.dependents) || 0,
        }),
      });
      
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({
          name: "", email: "", phone: "", taxNumber: "", profession: "", 
          monthlyIncome: "", maritalStatus: "Solteiro", dependents: "0", address: ""
        });
        fetchClients();
      }
    } catch (error) {
      console.error("Erro ao salvar cliente", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem a certeza que deseja eliminar este cliente?")) return;
    try {
      await fetch(`/api/clients/${id}`, { method: "DELETE" });
      fetchClients();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground text-sm mt-1">{clients.length} clientes registados</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold py-2.5 px-4 rounded-lg transition-all shadow-lg shadow-accent/25"
        >
          <Plus size={18} />
          Novo Cliente
        </button>
      </div>

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
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-cards/50">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nome</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Contato</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden lg:table-cell">Profissão</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden lg:table-cell">Rendimento</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Processos</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-muted-foreground">Carregando clientes...</td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-muted-foreground">Nenhum cliente encontrado.</td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} className="border-b border-border hover:bg-cards/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-active/10 flex items-center justify-center text-active font-semibold text-sm">
                          {client.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{client.name}</p>
                          <p className="text-xs text-muted-foreground">{client.taxNumber || "—"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <div className="space-y-1">
                        <p className="flex items-center gap-1.5 text-muted-foreground"><Mail size={13} />{client.email || "—"}</p>
                        <p className="flex items-center gap-1.5 text-muted-foreground"><Phone size={13} />{client.phone || "—"}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell text-muted-foreground">{client.profession || "—"}</td>
                    <td className="py-3 px-4 hidden lg:table-cell font-medium text-foreground">
                      {client.monthlyIncome ? `€${client.monthlyIncome.toLocaleString()}` : "—"}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-cards text-foreground text-xs font-medium px-2 py-1 rounded">{client._count?.processes || 0}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-600" onClick={() => handleDelete(client.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Novo Cliente */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Novo Cliente</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto flex-1">
              <form id="client-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Nome Completo *</label>
                    <input required type="text" className="w-full px-3 py-2 border border-input rounded-lg text-sm" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">E-mail</label>
                    <input type="email" className="w-full px-3 py-2 border border-input rounded-lg text-sm" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Telefone</label>
                    <input type="tel" className="w-full px-3 py-2 border border-input rounded-lg text-sm" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">NIF (Contribuinte)</label>
                    <input type="text" className="w-full px-3 py-2 border border-input rounded-lg text-sm" value={formData.taxNumber} onChange={(e) => setFormData({...formData, taxNumber: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Profissão</label>
                    <input type="text" className="w-full px-3 py-2 border border-input rounded-lg text-sm" value={formData.profession} onChange={(e) => setFormData({...formData, profession: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Rendimento Mensal (€)</label>
                    <input type="number" step="0.01" className="w-full px-3 py-2 border border-input rounded-lg text-sm" value={formData.monthlyIncome} onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Estado Civil</label>
                    <select className="w-full px-3 py-2 border border-input rounded-lg text-sm" value={formData.maritalStatus} onChange={(e) => setFormData({...formData, maritalStatus: e.target.value})}>
                      <option value="Solteiro">Solteiro</option>
                      <option value="Casado">Casado</option>
                      <option value="Divorciado">Divorciado</option>
                      <option value="Viúvo">Viúvo</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Dependentes</label>
                    <input type="number" min="0" className="w-full px-3 py-2 border border-input rounded-lg text-sm" value={formData.dependents} onChange={(e) => setFormData({...formData, dependents: e.target.value})} />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-sm font-medium text-foreground">Morada</label>
                    <textarea className="w-full px-3 py-2 border border-input rounded-lg text-sm resize-none" rows={2} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
                  </div>
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
                form="client-form"
                disabled={submitting}
                className="px-4 py-2 text-sm font-semibold bg-active text-white rounded-lg hover:bg-active/90 transition-all disabled:opacity-70 flex items-center gap-2"
              >
                {submitting ? "A guardar..." : "Guardar Cliente"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
