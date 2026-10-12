import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { av } from '../data'

const slides = [
  { a: av.profile, h: 'Hi, I’m Sagar Rathod', p: 'APM / Product Management candidate' },
  { a: av.working, h: 'Engineering + Operations + Analytics + Product Thinking', p: 'The combination I bring to every product problem', pills: [['Engineering', '#2ee6a6'], ['Operations', '#ffb020'], ['Analytics', '#22e5ea'], ['Product Thinking', '#9d5cff']] },
  { a: av.education, h: '3+ years, one direction', p: 'Technical consulting → operations & analytics → product management' },
  { a: av.projects, h: 'What you’ll find here', p: '4 proposed case studies · 3 product teardowns · 3 interactive tools' },
  { a: av.contact, h: 'Let’s build better products', p: 'Open to APM, Product Analyst and Product Operations roles' },
]

export default function Intro({ onClose }: { onClose: () => void }) {
  const [i, setI] = useState(0)
  const last = i === slides.length - 1
  const s = slides[i]
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') setI((x) => Math.min(x + 1, slides.length - 1)) }
    window.addEventListener('keydown', k)
    const t = last ? undefined : window.setTimeout(() => setI(i + 1), 4200)
    return () => { window.removeEventListener('keydown', k); window.clearTimeout(t) }
  }, [i, last, onClose])
  return (
    <motion.div role="dialog" aria-modal="true" aria-label="Introduction" className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#060818] px-6 text-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(600px circle at 50% 40%, ${s.a.color}33, transparent 65%)` }} />
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="relative flex max-w-2xl flex-col items-center">
          <span className="relative block h-40 w-40">
            <span className="absolute inset-0 animate-spin360 rounded-full" style={{ background: `conic-gradient(${s.a.color}, transparent 60%, ${s.a.color})` }} />
            <img src={s.a.src} alt={`Illustrated avatar of Sagar — ${s.a.label}`} className="absolute inset-[4px] h-[calc(100%-8px)] w-[calc(100%-8px)] rounded-full object-cover" />
          </span>
          <h2 className="mt-8 font-display text-3xl font-bold text-white sm:text-5xl">{s.h}</h2>
          <p className="mt-3 text-lg text-slate-300">{s.p}</p>
          {s.pills && <div className="mt-5 flex flex-wrap justify-center gap-2">{s.pills.map(([t, c]) => <span key={t} className="rounded-full px-4 py-1.5 text-sm font-semibold text-white" style={{ background: `${c}2a`, border: `1px solid ${c}` }}>{t}</span>)}</div>}
        </motion.div>
      </AnimatePresence>
      <div className="relative mt-10 flex items-center gap-2" aria-hidden="true">
        {slides.map((_, j) => <span key={j} className="h-1.5 rounded-full transition-all" style={{ width: j === i ? 28 : 8, background: j === i ? s.a.color : '#334155' }} />)}
      </div>
      <div className="relative mt-8 flex gap-3">
        {!last && <button onClick={onClose} className="rounded-full border border-white/15 px-5 py-2 text-sm text-slate-300 hover:text-white">Skip</button>}
        <button onClick={() => (last ? onClose() : setI(i + 1))} className="rounded-full bg-gradient-to-r from-sky2 via-violet2 to-coral px-6 py-2 text-sm font-semibold text-white">{last ? 'Enter Portfolio' : 'Next'}</button>
      </div>
    </motion.div>
  )
}
