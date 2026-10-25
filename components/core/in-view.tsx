'use client'

import { ReactNode, useRef, useState, useMemo } from 'react'
import {
  motion,
  useInView,
  Variant,
  Transition,
  UseInViewOptions,
  useReducedMotion,
} from 'motion/react'

export type InViewProps = {
  children: ReactNode
  variants?: {
    hidden: Variant
    visible: Variant
  }
  transition?: Transition
  viewOptions?: UseInViewOptions
  as?: React.ElementType
  className?: string
  once?: boolean
}

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export function InView({
  children,
  variants = defaultVariants,
  transition,
  viewOptions,
  as = 'div',
  className,
  once = false,
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, viewOptions)
  const [isViewed, setIsViewed] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const MotionComponent = useMemo(
    () => motion.create(as as keyof HTMLElementTagNameMap),
    [as]
  )

  const isVisible = shouldReduceMotion || isInView || (once && isViewed)

  return (
    <MotionComponent
      ref={ref}
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      animate={isVisible ? 'visible' : 'hidden'}
      onAnimationComplete={() => {
        if (once) setIsViewed(true)
      }}
      variants={variants}
      transition={shouldReduceMotion ? { duration: 0 } : transition}
      className={className}
    >
      {children}
    </MotionComponent>
  )
}
