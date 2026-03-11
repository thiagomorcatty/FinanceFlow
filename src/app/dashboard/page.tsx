"use client";

import MetricCard from "@/components/MetricCard";
import {
  Users,
  FileText,
  CheckCircle,
  Shield,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
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
  Area,
  AreaChart,
} from "recharts";

const monthlyData = [
  { month: "Jan", credito: 45000, seguro: 12000, contabilidade: 8000 },
  { month: "Fev", credito: 52000, seguro: 15000, contabilidade: 9500 },
  { month: "Mar", credito: 48000, seguro: 18000, contabilidade: 11000 },
  { month: "Abr", credito: 61000, seguro: 14000, contabilidade: 10000 },
  { month: "Mai", credito: 55000, seguro: 22000, contabilidade: 12000 },
  { month: "Jun", credito: 67000, seguro: 25000, contabilidade: 13000 },
];

const pipelineData = [
  { name: "Novo Lead", value: 24, color: "#3b82f6" },
  { name: "Análise", value: 18, color: "#06b6d4" },
  { name: "Simulação", value: 12, color: "#8b5cf6" },
  { name: "Aprovado", value: 8, color: "#10b981" },
  { name: "Concluído", value: 15, color: "#f59e0b" },
];

const commissionData = [
  { month: "Jan", valor: 3200 },
  { month: "Fev", valor: 4100 },
  { month: "Mar", valor: 3800 },
  { month: "Abr", valor: 5200 },
  { month: "Mai", valor: 4600 },
  { month: "Jun", valor: 6100 },
];

const recentProcesses = [
  { client: "João Silva", type: "Crédito Habitação", amount: "€250.000", status: "Em Análise", statusColor: "bg-blue-100 text-blue-700" },
  { client: "Maria Santos", type: "Crédito Pessoal", amount: "€15.000", status: "Aprovado", statusColor: "bg-emerald-100 text-emerald-700" },
  { client: "Pedro Costa", type: "Seguro Vida", amount: "€120/mês", status: "Proposta Recebida", statusColor: "bg-purple-100 text-purple-700" },
  { client: "Ana Ferreira", type: "Transferência Crédito", amount: "€180.000", status: "Documentos", statusColor: "bg-amber-100 text-amber-700" },
  { client: "Carlos Oliveira", type: "Contabilidade", amount: "€200/mês", status: "Novo Lead", statusColor: "bg-cyan-100 text-cyan-700" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Visão geral do seu negócio
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Novos Leads"
          value={24}
          change="+12% mês"
          changeType="positive"
          icon={Users}
          iconBg="bg-blue-50"
          iconColor="text-active"
        />
        <MetricCard
          title="Em Análise"
          value={18}
          change="5 esta semana"
          changeType="neutral"
          icon={FileText}
          iconBg="bg-cyan-50"
          iconColor="text-accent"
        />
        <MetricCard
          title="Créditos Aprovados"
          value={8}
          change="+25% mês"
          changeType="positive"
          icon={CheckCircle}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <MetricCard
          title="Seguros Ativos"
          value={32}
          change="+3 novos"
          changeType="positive"
          icon={Shield}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <MetricCard
          title="Comissões Esperadas"
          value="€6.100"
          change="+18% mês"
          changeType="positive"
          icon={DollarSign}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <MetricCard
          title="Receita Mensal"
          value="€12.400"
          change="+9% mês"
          changeType="positive"
          icon={TrendingUp}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Volume por Serviço</h3>
              <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-active" /> Crédito</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-accent" /> Seguro</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-500" /> Contab.</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="credito" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="seguro" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="contabilidade" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pipeline Pie Chart */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-1">Pipeline</h3>
          <p className="text-xs text-muted-foreground mb-4">Distribuição dos processos</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pipelineData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                dataKey="value"
                stroke="none"
              >
                {pipelineData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pipelineData.map((item, i) => (
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

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commission Trend */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-1">Comissões</h3>
          <p className="text-xs text-muted-foreground mb-4">Evolução mensal</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={commissionData}>
              <defs>
                <linearGradient id="colorComm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="valor" stroke="#06b6d4" strokeWidth={2} fill="url(#colorComm)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Processes */}
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Processos Recentes</h3>
              <p className="text-xs text-muted-foreground">Últimas atualizações</p>
            </div>
            <a href="/dashboard/processes" className="text-xs text-active hover:underline font-medium flex items-center gap-1">
              Ver todos <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="space-y-3">
            {recentProcesses.map((proc, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{proc.client}</p>
                  <p className="text-xs text-muted-foreground">{proc.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{proc.amount}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${proc.statusColor}`}>
                    {proc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
