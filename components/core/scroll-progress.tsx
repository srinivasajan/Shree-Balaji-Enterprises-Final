'use client'

import { RefObject } from 'react'
import {
  motion,
  SpringOptions,
  useScroll,
  useSpring,
  useReducedMotion,
} from 'motion/react'
import { cn } from '@/lib/utils'

export type ScrollProgressProps = {
  className?: string
  springOptions?: SpringOptions
  containerRef?: RefObject<HTMLElement | null>
}

const DEFAULT_SPRING_OPTIONS: SpringOptions = {
  stiffness: 200,
  damping: 50,
  restDelta: 0.001,
}

export function ScrollProgress({
  className,
  springOptions,
  containerRef,
}: ScrollProgressProps) {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    container: containerRef,
    layoutEffect: Boolean(containerRef?.current),
  })

  const scaleX = useSpring(scrollYProgress, {
    ...DEFAULT_SPRING_OPTIONS,
    ...(springOptions ?? {}),
  })

  if (shouldReduceMotion) return null

  return (
    <motion.div
      className={cn(
        'pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary',
        className
      )}
      style={{
        scaleX,
      }}
      aria-hidden="true"
    />
  )
}
