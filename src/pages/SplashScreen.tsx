import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cloud } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in effect
    setIsVisible(true);
    
    // Auto redirect after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => navigate('/login'), 500); // Wait for fade out
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleClick = () => {
    setIsVisible(false);
    setTimeout(() => navigate('/login'), 500);
  };

  return (
    <div 
      onClick={handleClick}
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-active-menu)',
        color: 'white',
        cursor: 'pointer',
        transition: 'opacity 0.5s ease-in-out',
        opacity: isVisible ? 1 : 0
      }}
    >
      <div style={{ textAlign: 'center', animation: 'pulse 2s infinite' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '1rem' }}>
          FINANCEFLOW
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: 0.9 }}>
          <span style={{ fontSize: '1rem', fontWeight: 400 }}>desenvolvido por</span>
          <div style={{ display: 'flex', alignItems: 'center', fontWeight: 600, gap: '0.25rem' }}>
            <Cloud size={20} />
            ROBONUVEM
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
        `}
      </style>
    </div>
  );
}
