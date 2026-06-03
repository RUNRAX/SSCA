import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from './AuthProvider';
import gsap from 'gsap';

interface SignupFormProps {
  onToggleMode: () => void;
}

export function SignupForm({ onToggleMode }: SignupFormProps) {
  const [name, setName] = useState('');
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
      await signup({ name, email, password });
      
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
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col w-full">
      <h2 className="text-3xl font-extrabold text-white mb-8 tracking-tight">Sign Up</h2>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3.5 rounded-lg text-sm font-medium mb-6">
          {error}
        </div>
      )}
      
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-xs font-semibold text-white/90 tracking-wide uppercase">Full Name</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-white text-black font-medium rounded-md px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#e83445] transition-shadow shadow-sm"
          placeholder="John Doe"
        />
      </div>
      
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-xs font-semibold text-white/90 tracking-wide uppercase">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-white text-black font-medium rounded-md px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#e83445] transition-shadow shadow-sm"
          placeholder="name@example.com"
        />
      </div>
      
      <div className="flex flex-col gap-2 mb-8">
        <label className="text-xs font-semibold text-white/90 tracking-wide uppercase">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="w-full bg-white text-black font-medium rounded-md px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#e83445] transition-shadow shadow-sm"
          placeholder="Min 8 characters"
        />
      </div>
      
      <button 
        ref={buttonRef}
        type="submit"
        onMouseDown={handleButtonPress}
        onMouseUp={handleButtonRelease}
        onMouseLeave={handleButtonRelease}
        className="w-full bg-[#da2b3a] hover:bg-[#c32230] text-white font-semibold py-3.5 rounded-md transition-colors flex items-center justify-center gap-2 shadow-lg mb-8"
      >
        Create Account
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
      </button>
      
      <div className="text-center text-xs text-white/80 font-medium">
        Already have an account?{' '}
        <button type="button" onClick={onToggleMode} className="text-white font-bold hover:underline ml-1">
          Sign IN
        </button>
      </div>
    </form>
  );
}
