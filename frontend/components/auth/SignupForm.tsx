import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from './AuthProvider';
import gsap from 'gsap';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuthContext();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await signup({ email, password });
      
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
      setError(err.message || 'Sign up failed');
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
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 focus:border-[var(--color-accent-purple)] focus:ring-1 focus:ring-[var(--color-accent-purple)] transition-all duration-300 shadow-inner"
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
            minLength={8}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 focus:border-[var(--color-accent-purple)] focus:ring-1 focus:ring-[var(--color-accent-purple)] transition-all duration-300 shadow-inner"
            placeholder="Min 8 characters"
          />
        </div>
      </div>
      <button 
        ref={buttonRef}
        type="submit"
        onMouseDown={handleButtonPress}
        onMouseUp={handleButtonRelease}
        onMouseLeave={handleButtonRelease}
        className="mt-4 relative overflow-hidden bg-gradient-to-r from-[var(--color-accent-teal)] to-[var(--color-accent-purple)] text-white font-extrabold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(150,0,255,0.3)] hover:shadow-[0_0_30px_rgba(150,0,255,0.5)] group"
      >
        <span className="relative z-10">Create Account</span>
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>
    </form>
  );
}
