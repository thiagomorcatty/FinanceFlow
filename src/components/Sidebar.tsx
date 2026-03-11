"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Kanban,
  Handshake,
  FolderOpen,
  CheckSquare,
  DollarSign,
  BarChart3,
  LogOut,
  Cloud,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/clients", label: "Clientes", icon: Users },
  { href: "/dashboard/processes", label: "Processos", icon: FileText },
  { href: "/dashboard/pipeline", label: "Pipeline", icon: Kanban },
  { href: "/dashboard/offers", label: "Propostas", icon: Handshake },
  { href: "/dashboard/documents", label: "Documentos", icon: FolderOpen },
  { href: "/dashboard/tasks", label: "Tarefas", icon: CheckSquare },
  { href: "/dashboard/commissions", label: "Comissões", icon: DollarSign },
  { href: "/dashboard/reports", label: "Relatórios", icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-sidebar text-white p-2 rounded-lg shadow-lg"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Menu size={20} />
      </button>

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 bg-sidebar text-white flex flex-col transition-all duration-300 ${
          collapsed ? "-translate-x-full lg:translate-x-0 lg:w-20" : "translate-x-0 w-64"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {!collapsed && (
            <h1 className="text-lg font-bold tracking-wider">
              FINANCE<span className="text-cyan-400">FLOW</span>
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ChevronLeft
              size={18}
              className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-active text-white shadow-lg shadow-active/25"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all w-full">
            <LogOut size={20} className="flex-shrink-0" />
            {!collapsed && <span>Sair</span>}
          </button>
          {!collapsed && (
            <div className="flex items-center gap-1.5 px-3 mt-3 text-white/30 text-xs">
              <Cloud size={12} />
              <span>by ROBONUVEM</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
