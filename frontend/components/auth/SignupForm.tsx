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
      gsap.to(buttonRef.current, { scale: 0.92, duration: 0.1, ease: "power2.in" });
    }
  };

  const handleButtonRelease = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { scale: 1, duration: 0.6, ease: "elastic.out(1.2, 0.4)" });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="bg-[var(--color-danger)]/20 border border-[var(--color-danger)]/50 text-[var(--color-danger)] p-3 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--color-text-secondary)] ml-1">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-[var(--glass-bg-light)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-accent-teal)] transition-colors"
          placeholder="name@example.com"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--color-text-secondary)] ml-1">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="bg-[var(--glass-bg-light)] border border-[var(--glass-border)] rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-accent-teal)] transition-colors"
          placeholder="Min 8 characters"
        />
      </div>
      <button 
        ref={buttonRef}
        type="submit"
        onMouseDown={handleButtonPress}
        onMouseUp={handleButtonRelease}
        onMouseLeave={handleButtonRelease}
        className="mt-2 bg-[var(--color-accent-purple)] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
      >
        Create Account
      </button>
    </form>
  );
}
