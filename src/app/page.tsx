"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cloud } from "lucide-react";

export default function SplashPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setShowSubtitle(true), 600);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => router.push("/login"), 500);
    }, 3500);
    return () => clearTimeout(timer);
  }, [router]);

  const handleClick = () => {
    setIsVisible(false);
    setTimeout(() => router.push("/login"), 500);
  };

  return (
    <div
      onClick={handleClick}
      className="h-screen w-screen flex flex-col items-center justify-center cursor-pointer overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #3b82f6 100%)",
        transition: "opacity 0.5s ease-in-out",
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 10 + 4}px`,
              height: `${Math.random() * 10 + 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        <h1
          className="text-5xl md:text-7xl font-bold text-white tracking-wider mb-2"
          style={{
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            opacity: isVisible ? 1 : 0,
          }}
        >
          FINANCE
          <span className="text-cyan-400">FLOW</span>
        </h1>
        <div
          className="h-1 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          style={{
            width: isVisible ? "200px" : "0px",
            transition: "width 1s ease-out 0.4s",
          }}
        />
        <div
          className="flex items-center justify-center gap-2 mt-6 text-white/70"
          style={{
            transition: "all 0.6s ease-out",
            transform: showSubtitle ? "translateY(0)" : "translateY(15px)",
            opacity: showSubtitle ? 1 : 0,
          }}
        >
          <span className="text-sm">desenvolvido por</span>
          <div className="flex items-center gap-1 font-semibold text-white/90">
            <Cloud size={18} />
            ROBONUVEM
          </div>
        </div>
        <p
          className="text-white/40 text-xs mt-8"
          style={{
            transition: "opacity 0.6s ease-out 1.2s",
            opacity: showSubtitle ? 1 : 0,
          }}
        >
          Clique para continuar
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
