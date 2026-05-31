'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface TransitionContextType {
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType>({ isTransitioning: false });

export function RouteTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== currentPath) {
      // Start exit animation
      setIsTransitioning(true);
      setCurrentPath(pathname);
      
      const timeout = setTimeout(() => {
        // Update children and end transition after exit animation duration
        setDisplayChildren(children);
        setIsTransitioning(false);
      }, 300); // 300ms exit animation
      
      return () => clearTimeout(timeout);
    } else {
      setDisplayChildren(children);
    }
  }, [pathname, children, currentPath]);

  return (
    <TransitionContext.Provider value={{ isTransitioning }}>
      {displayChildren}
    </TransitionContext.Provider>
  );
}

export function useTransitionContext() {
  return useContext(TransitionContext);
}
