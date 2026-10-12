import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { GraduationCap, BookOpen, Linkedin, Mail, FileText, Phone, MapPin, X } from 'lucide-react'
import { av, journey, jobs, work, skills, training, summary, why, P } from '../data'
import type { Work } from '../data'
import Tilt from './Tilt'
import Visual from './Visuals'

type AV = (typeof av)[keyof typeof av]

export function Head({ a, id, title, sub }: { a: AV; id: string; title: string; sub: string }) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-10 flex items-center gap-4" id={id}>
      <span className="relative h-16 w-16 shrink-0">
        <span className="absolute inset-0 animate-spin360 rounded-full" style={{ background: `conic-gradient(${a.color}, transparent 60%, ${a.color})` }} />
        <img src={a.src} alt={`Illustrated avatar of Sagar — ${a.label}`} className="absolute inset-[3px] h-[calc(100%-6px)] w-[calc(100%-6px)] rounded-full object-cover" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: a.color }}>{sub}</p>
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      </div>
    </motion.div>
  )
}

const Wrap = ({ children, id }: { children: ReactNode; id?: string }) => (
  <section id={id} className="relative z-10 mx-auto max-w-6xl px-5 py-16 lg:px-8">{children}</section>
)

export function About() {
  return (
    <Wrap>
      <Head a={av.profile} id="about" sub="Profile" title="Engineer. Operator. Analyst. Product thinker." />
      <p className="mb-8 max-w-3xl text-lg text-slate-300">{summary}</p>
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[['3+', 'Years of experience'], [String(jobs.length), 'Roles held'], ['4', 'Case studies'], ['3', 'Teardowns'], ['3', 'Interactive tools']].map(([n, l]) => (
          <div key={l} className="glass rounded-2xl px-4 py-3 text-center"><div className="text-gradient font-display text-3xl font-bold">{n}</div><div className="text-xs text-slate-400">{l}</div></div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {journey.map((j, i) => (
          <Tilt key={j.t} color={j.c} className="relative p-5">
            <span className="font-display text-4xl font-bold" style={{ color: j.c }}>0{i + 1}</span>
            <h3 className="mt-2 font-display text-lg font-semibold text-white">{j.t}</h3>
            <p className="mt-1 text-sm text-slate-400">{j.d}</p>
            {i < journey.length - 1 && <span className="absolute -right-3 top-1/2 hidden text-xl md:block" style={{ color: j.c }} aria-hidden="true">→</span>}
          </Tilt>
        ))}
      </div>
    </Wrap>
  )
}

export function Experience() {
  return (
    <Wrap>
      <Head a={av.working} id="experience" sub="Experience" title="Where I've worked" />
      <div className="relative grid gap-6 lg:grid-cols-2">
        {jobs.map((j) => (
          <Tilt key={j.role} color={j.c} className="p-6">
            <div className="mb-1 h-1.5 w-16 rounded-full" style={{ background: j.c }} />
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest" style={{ color: j.c }}>{j.when}</p>
            <h3 className="mt-1 font-display text-xl font-semibold text-white">{j.role}</h3>
            <p className="text-sm text-slate-400">{j.org}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {j.pts.map((p) => (
                <li key={p} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: j.c }} />{p}</li>
              ))}
            </ul>
          </Tilt>
        ))}
      </div>
    </Wrap>
  )
}

function Modal({ w, close }: { w: Work; close: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [close])
  const Sec = ({ t, children }: { t: string; children: ReactNode }) => (
    <section className="mt-6"><h4 className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: w.c }}>{t}</h4>{children}</section>
  )
  const dot = <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: w.c }} />
  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
      <motion.div role="dialog" aria-modal="true" aria-label={w.title} onClick={(e) => e.stopPropagation()} initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 30 }}
        className="glass relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-[#0b0f26] p-6 sm:p-8" style={{ boxShadow: `0 0 80px -20px ${w.c}` }}>
        <button onClick={close} aria-label="Close" className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:text-white"><X size={20} /></button>
        <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${w.c}26`, color: w.c }}>{w.kind === 'Case Study' ? 'Proposed case study' : 'Product teardown'}</span>
        <h3 className="mt-3 pr-8 font-display text-2xl font-bold text-white sm:text-3xl">{w.title}</h3>
        {w.problem && <Sec t="Problem"><p className="text-sm text-slate-300">{w.problem}</p></Sec>}
        {w.user && <Sec t="Target user"><p className="text-sm text-slate-300">{w.user}</p></Sec>}
        {w.stages && <Sec t="Journey evaluated"><div className="flex flex-wrap gap-2">{w.stages.map((x) => <span key={x} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white">{x}</span>)}</div></Sec>}
        <Sec t={w.kind === 'Case Study' ? 'What I designed' : 'What I did'}>
          <ul className="space-y-2 text-sm text-slate-300">{w.solution.map((p) => <li key={p} className="flex gap-2">{dot}{p}</li>)}</ul>
        </Sec>
        {w.visual && <Sec t="Artifacts"><div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><Visual k={w.visual} /></div></Sec>}
        {w.decisions && (
          <Sec t="Product decisions & trade-offs">
            <ul className="space-y-3 text-sm">{w.decisions.map((d) => <li key={d.d}><b className="text-white">{d.d}.</b> <span className="text-slate-300">{d.why}</span></li>)}</ul>
          </Sec>
        )}
        <Sec t={w.kind === 'Case Study' ? 'Success metrics defined' : 'Metrics mapped'}>
          <ul className="flex flex-wrap gap-2">{w.metrics.map((m) => <li key={m} className="rounded-full px-3 py-1 text-xs font-medium text-white" style={{ background: `${w.c}22`, border: `1px solid ${w.c}66` }}>{m}</li>)}</ul>
        </Sec>
        {w.link && <a href={w.link} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block rounded-full px-4 py-1.5 text-sm font-semibold text-white" style={{ background: w.c }}>View document →</a>}
        <p className="mt-6 rounded-xl bg-white/5 p-3 text-xs text-slate-400">Independent product-thinking exercise: proposed concepts, not an employer project or a shipped product. No measured results are claimed.</p>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const [open, setOpen] = useState<Work | null>(null)
  const card = (w: Work) => (
    <Tilt key={w.title} color={w.c} className="p-0">
      <button onClick={() => setOpen(w)} className="block h-full w-full rounded-2xl p-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-cyan2">
        <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ background: `${w.c}26`, color: w.c }}>{w.kind === 'Case Study' ? 'Proposed case study' : 'Teardown'}</span>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-white">{w.title}</h3>
        <p className="mt-1 text-sm text-slate-400">{w.line}</p>
        <span className="mt-4 inline-block text-xs font-semibold" style={{ color: w.c }}>Open case study →</span>
      </button>
    </Tilt>
  )
  return (
    <Wrap>
      <Head a={av.projects} id="projects" sub="Projects" title="Case studies & teardowns" />
      <div className="grid gap-5 sm:grid-cols-2">{work.filter((w) => w.kind === 'Case Study').map(card)}</div>
      <h3 className="mb-4 mt-10 font-display text-xl font-semibold text-white">Product teardowns — Swiggy, Google Pay &amp; WhatsApp</h3>
      <div className="grid gap-5 sm:grid-cols-3">{work.filter((w) => w.kind === 'Teardown').map(card)}</div>
      {createPortal(<AnimatePresence>{open && <Modal w={open} close={() => setOpen(null)} />}</AnimatePresence>, document.body)}
    </Wrap>
  )
}

export function Skills() {
  return (
    <Wrap>
      <div id="skills" className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet2">Skills & Tools</p>
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">What I bring</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {skills.map((s) => (
          <Tilt key={s.g} color={s.c} className="p-5">
            <h3 className="mb-3 font-display text-lg font-semibold" style={{ color: s.c }}>{s.g}</h3>
            <ul className="flex flex-wrap gap-2">
              {s.items.map((i) => (
                <li key={i} className="rounded-full px-3 py-1 text-xs font-medium text-white" style={{ background: `${s.c}1f`, border: `1px solid ${s.c}55` }}>{i}</li>
              ))}
            </ul>
          </Tilt>
        ))}
      </div>
    </Wrap>
  )
}

export function Education() {
  return (
    <Wrap>
      <Head a={av.education} id="education" sub="Education & Training" title="Foundation + PM training" />
      <div className="grid gap-5 md:grid-cols-2">
        <Tilt color="#2ee6a6" className="p-6">
          <GraduationCap className="text-mint" aria-hidden="true" />
          <h3 className="mt-3 font-display text-xl font-semibold text-white">B.Tech, Electronics and Communication Engineering</h3>
          <p className="text-slate-300">Indian Institute of Information Technology (IIIT) Dharwad</p>
          <p className="text-sm text-slate-400">2019 – 2023</p>
        </Tilt>
        <Tilt color="#9d5cff" className="p-6">
          <BookOpen className="text-violet2" aria-hidden="true" />
          <h3 className="mt-3 font-display text-xl font-semibold text-white">CareerVeda – Product Management Program</h3>
          <p className="mb-3 text-sm text-slate-400">Training programme · areas covered</p>
          <ul className="flex flex-wrap gap-2">
            {training.map((t) => <li key={t} className="rounded-full border border-violet2/50 bg-violet2/10 px-3 py-1 text-xs text-white">{t}</li>)}
          </ul>
        </Tilt>
      </div>
    </Wrap>
  )
}

export function Contact() {
  const btn = 'flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-105'
  return (
    <Wrap>
      <Tilt color="#ff6b5c" className="relative overflow-hidden p-8 text-center sm:p-12">
        <div id="contact" className="absolute -top-24" />
        <span className="mx-auto block h-28 w-28 rounded-full p-[3px]" style={{ background: `conic-gradient(${av.contact.color}, #fff3, ${av.contact.color})` }}>
          <img src={av.contact.src} alt="Illustrated avatar of Sagar — Contact" className="h-full w-full rounded-full object-cover" />
        </span>
        <h2 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">Let&rsquo;s build <span className="text-gradient">better products.</span></h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-300">Open to Associate Product Manager, Product Analyst and Product Operations roles.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href={`mailto:${P.email}`} className={`${btn} bg-gradient-to-r from-coral to-violet2 text-white`}><Mail size={16} /> Email Me</a>
          <a href={P.linkedin} target="_blank" rel="noopener noreferrer" className={`${btn} glass text-white`}><Linkedin size={16} /> LinkedIn</a>
          <a href={P.resume} target="_blank" rel="noopener noreferrer" className={`${btn} border border-white/15 text-white hover:border-cyan2`}><FileText size={16} /> Resume</a>
        </div>
        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-300">
          <a href={`tel:${P.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-cyan2"><Phone size={14} /> {P.phone}</a>
          <span className="flex items-center gap-2"><MapPin size={14} /> {P.loc}</span>
        </p>
      </Tilt>
      <p className="mt-10 text-center text-xs text-slate-500">© {new Date().getFullYear()} Sagar Rathod · Avatars are illustrations.</p>
    </Wrap>
  )
}

export function WhyHire() {
  return (
    <Wrap>
      <div id="why" className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral">Why hire me</p>
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Four things a hiring manager gets</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {why.map((w, i) => (
          <Tilt key={w.t} color={w.c} className="p-5">
            <span className="font-display text-3xl font-bold" style={{ color: w.c }}>0{i + 1}</span>
            <h3 className="mt-2 font-display text-lg font-semibold text-white">{w.t}</h3>
            <p className="mt-2 text-sm text-slate-300">{w.d}</p>
          </Tilt>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-slate-400">Open to: <b className="text-white">Associate Product Manager · Product Analyst · Product Operations</b></p>
    </Wrap>
  )
}
