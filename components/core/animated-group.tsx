'use client'

import React, { ReactNode, useMemo } from 'react'
import { motion, Variants, useReducedMotion } from 'motion/react'

export type PresetType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'blur'
  | 'blur-slide'
  | 'zoom'
  | 'flip'
  | 'bounce'
  | 'rotate'
  | 'swing'

export type AnimatedGroupProps = {
  children: ReactNode
  className?: string
  childClassName?: string
  variants?: {
    container?: Variants
    item?: Variants
  }
  preset?: PresetType
  as?: React.ElementType
  asChild?: React.ElementType
}

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const presetVariants: Record<PresetType, Variants> = {
  fade: {},
  slide: {
    hidden: { y: 20 },
    visible: { y: 0 },
  },
  scale: {
    hidden: { scale: 0.95 },
    visible: { scale: 1 },
  },
  blur: {
    hidden: { filter: 'blur(6px)' },
    visible: { filter: 'blur(0px)' },
  },
  'blur-slide': {
    hidden: { filter: 'blur(6px)', y: 20 },
    visible: { filter: 'blur(0px)', y: 0 },
  },
  zoom: {
    hidden: { scale: 0.8 },
    visible: {
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  },
  flip: {
    hidden: { rotateX: -90 },
    visible: {
      rotateX: 0,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  },
  bounce: {
    hidden: { y: -30 },
    visible: {
      y: 0,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
  },
  rotate: {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  },
  swing: {
    hidden: { rotate: -10 },
    visible: {
      rotate: 0,
      transition: { type: 'spring', stiffness: 300, damping: 8 },
    },
  },
}

const addDefaultVariants = (variants: Variants) => ({
  hidden: { ...defaultItemVariants.hidden, ...variants.hidden },
  visible: { ...defaultItemVariants.visible, ...variants.visible },
})

export function AnimatedGroup({
  children,
  className,
  childClassName,
  variants,
  preset,
  as = 'div',
  asChild = 'div',
}: AnimatedGroupProps) {
  const shouldReduceMotion = useReducedMotion()

  const selectedVariants = useMemo(() => {
    return {
      item: addDefaultVariants(preset ? presetVariants[preset] : {}),
      container: addDefaultVariants(defaultContainerVariants),
    }
  }, [preset])

  const containerVariants = variants?.container || selectedVariants.container
  const itemVariants = variants?.item || selectedVariants.item

  const MotionComponent = useMemo(
    () => motion.create(as as keyof HTMLElementTagNameMap),
    [as]
  )
  const MotionChild = useMemo(
    () => motion.create(asChild as keyof HTMLElementTagNameMap),
    [asChild]
  )

  return (
    <MotionComponent
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      animate="visible"
      variants={shouldReduceMotion ? { visible: {} } : containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child
        return (
          <MotionChild
            key={child.key ?? index}
            variants={shouldReduceMotion ? { visible: {} } : itemVariants}
            className={childClassName}
          >
            {child}
          </MotionChild>
        )
      })}
    </MotionComponent>
  )
}
