import { Component, lazy, Suspense, useMemo } from 'react'
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, FileText, Mail } from 'lucide-react'
import { av, P } from '../data'

const Scene = lazy(() => import('./Scene'))

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { err: boolean }> {
  state = { err: false }
  static getDerivedStateFromError() { return { err: true } }
  render() { return this.state.err ? this.props.fallback : this.props.children }
}

function StaticAvatars() {
  const list = [av.profile, av.working, av.education, av.projects, av.contact]
  return (
    <div className="grid grid-cols-3 place-items-center gap-4 p-4">
      {list.map((a) => (
        <a key={a.label} href={a.href} className="text-center text-xs font-semibold text-white">
          <img src={a.src} alt={`Illustrated avatar of Sagar — ${a.label}`} className="h-24 w-24 rounded-full object-cover" style={{ border: `3px solid ${a.color}` }} />
          <span className="mt-1 block">{a.label}</span>
        </a>
      ))}
    </div>
  )
}

function hasWebGL() {
  try { return !!document.createElement('canvas').getContext('webgl2') || !!document.createElement('canvas').getContext('webgl') } catch { return false }
}

const fade = (i: number) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 * i, duration: 0.6 } })

export default function Hero({ onIntro }: { onIntro: () => void }) {
  const reduce = useReducedMotion()
  const gl = useMemo(hasWebGL, [])
  const use3D = gl && !reduce

  return (
    <section id="home" className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-6 px-5 pb-10 pt-28 lg:grid-cols-[1fr_1.05fr] lg:px-8">
      <div>
        <motion.span {...fade(0)} className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-cyan2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-mint" /> {P.badge}
        </motion.span>
        <motion.h1 {...fade(1)} className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Sagar <span className="text-gradient">Rathod</span>
        </motion.h1>
        <motion.p {...fade(2)} className="mt-4 font-display text-xl text-slate-300 sm:text-2xl">
          Building better products by combining technology, data, and operational insight.
        </motion.p>
        <motion.div {...fade(3)} className="mt-5 flex flex-wrap gap-2">
          {[['Engineering', '#2ee6a6'], ['Operations', '#ffb020'], ['Analytics', '#22e5ea'], ['Product Thinking', '#9d5cff']].map(([t, c]) => (
            <span key={t} className="rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ background: `${c}26`, border: `1px solid ${c}88` }}>{t}</span>
          ))}
        </motion.div>
        <motion.div {...fade(4)} className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="flex items-center gap-2 rounded-full bg-gradient-to-r from-sky2 via-violet2 to-coral px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-8px_#9d5cff] transition-transform hover:scale-105">
            Explore My Work <ArrowRight size={16} />
          </a>
          <a href={P.resume} target="_blank" rel="noopener noreferrer" className="glass flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105">
            <FileText size={16} /> Download Resume
          </a>
          <a href="#contact" className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan2 hover:text-cyan2">
            <Mail size={16} /> Contact Me
          </a>
          <button onClick={onIntro} className="px-3 py-3 text-sm font-semibold text-slate-400 transition-colors hover:text-white">▶ Watch intro</button>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="relative h-[420px] w-full sm:h-[560px]">
        {use3D ? (
          <Boundary fallback={<StaticAvatars />}>
            <Suspense fallback={<div className="mx-auto mt-24 h-40 w-40 animate-pulse rounded-full bg-violet2/30 blur-xl" />}>
              <Scene />
            </Suspense>
          </Boundary>
        ) : (
          <StaticAvatars />
        )}
      </motion.div>
    </section>
  )
}
