'use client';

import React, {
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  useReducedMotion,
} from 'motion/react';
import { cn } from '@/lib/utils';

export type DockContextType = {
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
};

const DockContext = createContext<DockContextType | undefined>(undefined);

export function useDock() {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error('useDock must be used within a DockProvider');
  }
  return context;
}

export type DockProps = {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  magnification?: number;
  spring?: SpringOptions;
};

const DEFAULT_DISTANCE = 130;
const DEFAULT_MAGNIFICATION = 1.10; // 10% subtle, refined text magnification
const DEFAULT_SPRING: SpringOptions = { mass: 0.1, stiffness: 200, damping: 15 };

export function Dock({
  children,
  className,
  distance = DEFAULT_DISTANCE,
  magnification = DEFAULT_MAGNIFICATION,
  spring = DEFAULT_SPRING,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <nav aria-label="Main Navigation Dock" className="relative flex items-center justify-center">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          'flex items-center gap-0.5 rounded-full border border-border/80 bg-white/95 dark:bg-card/95 px-2 py-1 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md',
          className
        )}
        role="menubar"
      >
        <DockContext.Provider value={{ mouseX, spring, distance, magnification }}>
          {children}
        </DockContext.Provider>
      </motion.div>
    </nav>
  );
}

export type DockItemProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function DockItem({
  href,
  children,
  className,
  onClick,
}: DockItemProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const { distance, magnification, mouseX, spring } = useDock();
  const [hovered, setHovered] = useState(false);

  const isActive = pathname.startsWith(href);

  // Motion Primitives proximity distance calculation from cursor to center of this text item
  const mouseDistance = useTransform(mouseX, (val) => {
    const domRect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - (domRect.x + domRect.width / 2);
  });

  // Proximity-based magnification for text scale
  const scaleTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    shouldReduceMotion ? [1, 1, 1] : [1, magnification, 1]
  );

  // Restrained, spring-based width/spacing transition inspired by Motion Primitives Dock
  const paddingTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    shouldReduceMotion ? [14, 14, 14] : [14, 18, 14]
  );

  // Gentle vertical lift for tactile feel
  const yTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    shouldReduceMotion ? [0, 0, 0] : [0, -1.5, 0]
  );

  const scale = useSpring(scaleTransform, spring);
  const paddingX = useSpring(paddingTransform, spring);
  const y = useSpring(yTransform, spring);

  return (
    <Link
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center text-sm rounded-full outline-none select-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        className
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <motion.div
        style={{
          paddingLeft: paddingX,
          paddingRight: paddingX,
        }}
        className="relative inline-flex items-center justify-center py-1.5 rounded-full"
      >
        {/* Active route highlight pill */}
        {isActive && (
          <motion.div
            layoutId="activeDockPill"
            className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20 -z-10"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}

        {/* Hover background pill */}
        {hovered && !isActive && (
          <motion.div
            layoutId="hoverDockPill"
            className="absolute inset-0 rounded-full bg-black/[0.04] dark:bg-white/[0.08] -z-10"
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          />
        )}

        {/* Permanently visible text label with smooth spring magnification */}
        <motion.span
          style={{ scale, y }}
          className={cn(
            'inline-block whitespace-nowrap transition-colors',
            isActive
              ? 'text-primary font-bold'
              : 'text-foreground/80 hover:text-foreground font-semibold'
          )}
        >
          {children}
        </motion.span>
      </motion.div>
    </Link>
  );
}
