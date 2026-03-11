"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Cloud, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // TODO: Firebase auth integration
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel - Branding */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #3b82f6 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="z-10 text-center">
          <h1 className="text-5xl font-bold text-white tracking-wider mb-3">
            FINANCE<span className="text-cyan-400">FLOW</span>
          </h1>
          <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6" />
          <p className="text-white/60 text-lg max-w-sm">
            CRM completo para mediadores financeiros
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4 text-white/50 text-sm">
            <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-white/80 font-semibold text-2xl mb-1">360°</p>
              <p>Gestão de Clientes</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-white/80 font-semibold text-2xl mb-1">📊</p>
              <p>Relatórios Avançados</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-white/80 font-semibold text-2xl mb-1">🏦</p>
              <p>Propostas Bancárias</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-white/80 font-semibold text-2xl mb-1">💰</p>
              <p>Comissões</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md animate-fade-in">
          <div className="flex items-center gap-2 mb-2 lg:hidden">
            <Cloud className="text-active" size={28} />
            <h1 className="text-2xl font-bold text-sidebar">
              FINANCE<span className="text-accent">FLOW</span>
            </h1>
          </div>

          <h2 className="text-2xl font-bold text-sidebar mb-1">Bem-vindo de volta</h2>
          <p className="text-muted-foreground mb-8">
            Entre com suas credenciais para acessar o sistema
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                E-mail
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg bg-white focus:ring-2 focus:ring-active/20 focus:border-active transition-all outline-none text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Senha
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg bg-white focus:ring-2 focus:ring-active/20 focus:border-active transition-all outline-none text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-input" />
                <span className="text-muted-foreground">Lembrar-me</span>
              </label>
              <a href="#" className="text-active hover:text-active/80 font-medium transition-colors">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Entrar
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-input text-center">
            <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-xs">
              <Cloud size={14} />
              <span>desenvolvido por <strong className="text-foreground">ROBONUVEM</strong></span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
