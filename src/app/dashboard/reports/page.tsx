"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, Users, DollarSign, Target } from "lucide-react";

const creditVolumeData = [
  { month: "Jan", habitacao: 250000, pessoal: 35000, transferencia: 0 },
  { month: "Fev", habitacao: 320000, pessoal: 23000, transferencia: 180000 },
  { month: "Mar", habitacao: 180000, pessoal: 42000, transferencia: 0 },
  { month: "Abr", habitacao: 450000, pessoal: 58000, transferencia: 220000 },
  { month: "Mai", habitacao: 300000, pessoal: 15000, transferencia: 0 },
  { month: "Jun", habitacao: 520000, pessoal: 30000, transferencia: 150000 },
];

const insuranceData = [
  { month: "Jan", vida: 5, automovel: 3, saude: 2 },
  { month: "Fev", vida: 7, automovel: 4, saude: 3 },
  { month: "Mar", vida: 4, automovel: 6, saude: 1 },
  { month: "Abr", vida: 8, automovel: 5, saude: 4 },
  { month: "Mai", vida: 6, automovel: 3, saude: 5 },
  { month: "Jun", vida: 9, automovel: 7, saude: 3 },
];

const commissionsByMonth = [
  { month: "Jan", valor: 3200 },
  { month: "Fev", valor: 4800 },
  { month: "Mar", valor: 2900 },
  { month: "Abr", valor: 6200 },
  { month: "Mai", valor: 4100 },
  { month: "Jun", valor: 7500 },
];

const consultantPerformance = [
  { name: "Carlos Mendes", processes: 15, conversions: 10, commission: 12500, rate: 67 },
  { name: "Ana Ribeiro", processes: 12, conversions: 9, commission: 9800, rate: 75 },
  { name: "João Pereira", processes: 8, conversions: 5, commission: 5200, rate: 63 },
];

const conversionData = [
  { name: "Convertidos", value: 24, color: "#10b981" },
  { name: "Em curso", value: 18, color: "#3b82f6" },
  { name: "Perdidos", value: 8, color: "#ef4444" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Relatórios</h1>
        <p className="text-muted-foreground text-sm mt-1">Análise detalhada do desempenho</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50"><TrendingUp size={20} className="text-active" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Volume Total Mediado</p>
              <p className="text-xl font-bold text-foreground">€2.87M</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-50"><DollarSign size={20} className="text-accent" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Comissões (6 meses)</p>
              <p className="text-xl font-bold text-foreground">€28.700</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50"><Users size={20} className="text-emerald-600" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Seguros Vendidos</p>
              <p className="text-xl font-bold text-foreground">70</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50"><Target size={20} className="text-purple-600" /></div>
            <div>
              <p className="text-xs text-muted-foreground">Taxa de Conversão</p>
              <p className="text-xl font-bold text-foreground">68%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Volume Chart */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h3 className="font-semibold text-foreground mb-1">Volume de Crédito Mediado</h3>
        <p className="text-xs text-muted-foreground mb-4">Análise por tipo – últimos 6 meses</p>
        <div className="flex gap-4 mb-4 text-xs">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-active" /> Habitação</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-accent" /> Pessoal</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-500" /> Transferência</span>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={creditVolumeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} formatter={(value: number) => `€${value.toLocaleString()}`} />
            <Bar dataKey="habitacao" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pessoal" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            <Bar dataKey="transferencia" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Insurance Sales */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-1">Vendas de Seguros</h3>
          <p className="text-xs text-muted-foreground mb-4">Contratos por tipo</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={insuranceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="vida" fill="#10b981" radius={[4, 4, 0, 0]} name="Vida" />
              <Bar dataKey="automovel" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Automóvel" />
              <Bar dataKey="saude" fill="#ec4899" radius={[4, 4, 0, 0]} name="Saúde" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Commission Trend */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-1">Comissões por Mês</h3>
          <p className="text-xs text-muted-foreground mb-4">Evolução mensal</p>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={commissionsByMonth}>
              <defs>
                <linearGradient id="colorCommReport" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `€${v}`} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} formatter={(value: number) => `€${value.toLocaleString()}`} />
              <Area type="monotone" dataKey="valor" stroke="#06b6d4" strokeWidth={2} fill="url(#colorCommReport)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Consultant Performance */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-1">Desempenho dos Consultores</h3>
          <p className="text-xs text-muted-foreground mb-4">Ranking por comissões geradas</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground">Consultor</th>
                  <th className="text-center py-2 px-3 font-medium text-muted-foreground">Processos</th>
                  <th className="text-center py-2 px-3 font-medium text-muted-foreground">Conversões</th>
                  <th className="text-center py-2 px-3 font-medium text-muted-foreground">Taxa</th>
                  <th className="text-right py-2 px-3 font-medium text-muted-foreground">Comissão</th>
                </tr>
              </thead>
              <tbody>
                {consultantPerformance.map((c, i) => (
                  <tr key={i} className="border-b border-border hover:bg-cards/30">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-active/10 flex items-center justify-center text-active text-xs font-semibold">
                          {c.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="font-medium text-foreground">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center text-muted-foreground">{c.processes}</td>
                    <td className="py-3 px-3 text-center text-muted-foreground">{c.conversions}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.rate >= 70 ? "bg-emerald-100 text-emerald-700" : c.rate >= 60 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                        {c.rate}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-foreground">€{c.commission.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Conversion Rate Pie */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-1">Taxa de Conversão</h3>
          <p className="text-xs text-muted-foreground mb-4">Distribuição geral</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={conversionData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" stroke="none">
                {conversionData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {conversionData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
