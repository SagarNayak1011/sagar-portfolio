import type { ReactNode, PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

export default function Tilt({ children, className = '', color = '#9d5cff' }: { children: ReactNode; className?: string; color?: string }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), { stiffness: 220, damping: 20 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), { stiffness: 220, damping: 20 })

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const leave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, boxShadow: `0 20px 50px -25px ${color}` }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className={`glass rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  )
}
