"use client";

import { Bell, Search, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar clientes, processos..."
            className="w-full pl-10 pr-4 py-2 bg-cards rounded-lg text-sm outline-none focus:ring-2 focus:ring-active/20 transition-all"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 ml-4">
        <button className="relative p-2 rounded-lg hover:bg-cards transition-colors">
          <Bell size={20} className="text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </button>
        <div className="h-8 w-px bg-border" />
        <button className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-cards transition-colors">
          <div className="w-8 h-8 rounded-full bg-active flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-foreground">Admin</p>
            <p className="text-xs text-muted-foreground">Administrador</p>
          </div>
        </button>
      </div>
    </header>
  );
}
