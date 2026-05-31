import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from './AuthProvider';
import gsap from 'gsap';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuthContext();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login({ email, password });
      
      // Success animation before redirect
      if (formRef.current) {
        gsap.to(formRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            router.push('/dashboard');
          }
        });
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
      // Shake animation on error
      if (formRef.current) {
        gsap.fromTo(formRef.current, 
          { x: -10 },
          { x: 10, duration: 0.1, yoyo: true, repeat: 3, ease: "linear", 
            onComplete: () => gsap.set(formRef.current, { x: 0 }) 
          }
        );
      }
    }
  };

  const handleButtonPress = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { scale: 0.95, duration: 0.1, ease: "power2.in" });
    }
  };

  const handleButtonRelease = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { scale: 1, duration: 0.6, ease: "elastic.out(1.2, 0.4)" });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-sm font-medium backdrop-blur-md shadow-sm">
          {error}
        </div>
      )}
      <div className="flex flex-col gap-1.5 group">
        <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1 group-focus-within:text-white transition-colors duration-300">Email</label>
        <div className="relative">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 focus:border-[var(--color-accent-teal)] focus:ring-1 focus:ring-[var(--color-accent-teal)] transition-all duration-300 shadow-inner"
            placeholder="name@example.com"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5 group">
        <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1 group-focus-within:text-white transition-colors duration-300">Password</label>
        <div className="relative">
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 focus:border-[var(--color-accent-teal)] focus:ring-1 focus:ring-[var(--color-accent-teal)] transition-all duration-300 shadow-inner"
            placeholder="••••••••"
          />
        </div>
      </div>
      <button 
        ref={buttonRef}
        type="submit"
        onMouseDown={handleButtonPress}
        onMouseUp={handleButtonRelease}
        onMouseLeave={handleButtonRelease}
        className="mt-4 relative overflow-hidden bg-white text-black font-extrabold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] group"
      >
        <span className="relative z-10">Sign In</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
      </button>
    </form>
  );
}
