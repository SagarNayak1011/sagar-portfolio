import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Hero from './components/Hero'
import Lab from './components/Lab'
import Intro from './components/Intro'
import { About, WhyHire, Experience, Projects, Skills, Education, Contact } from './components/Sections'
import { P } from './data'

const links = [['About', '#about'], ['Why Me', '#why'], ['Experience', '#experience'], ['Projects', '#projects'], ['Lab', '#lab'], ['Skills', '#skills'], ['Education', '#education'], ['Contact', '#contact']]

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <nav aria-label="Main" className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5">
        <a href="#home" className="font-display text-lg font-bold text-white">S<span className="text-cyan2">.</span>Rathod</a>
        <ul className="hidden gap-6 md:flex">
          {links.map(([t, h]) => <li key={t}><a href={h} className="text-sm text-slate-300 transition-colors hover:text-cyan2">{t}</a></li>)}
        </ul>
        <a href={P.resume} target="_blank" rel="noopener noreferrer" className="hidden rounded-full bg-gradient-to-r from-sky2 to-violet2 px-4 py-1.5 text-sm font-semibold text-white md:block">Resume</a>
        <button className="text-white md:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      {open && (
        <ul className="glass mx-auto mt-2 max-w-6xl space-y-1 rounded-3xl bg-[#0b0f26]/95 p-4 md:hidden">
          {links.map(([t, h]) => <li key={t}><a href={h} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-slate-200 hover:bg-white/10">{t}</a></li>)}
        </ul>
      )}
    </header>
  )
}

export default function App() {
  const seen = (() => { try { return sessionStorage.getItem('intro-seen') === '1' } catch { return false } })()
  const [intro, setIntro] = useState(!seen)
  const closeIntro = () => { setIntro(false); try { sessionStorage.setItem('intro-seen', '1') } catch { /* ignore */ } }
  useEffect(() => {
    const m = (e: PointerEvent) => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`)
      document.documentElement.style.setProperty('--my', `${e.clientY}px`)
    }
    window.addEventListener('pointermove', m)
    return () => window.removeEventListener('pointermove', m)
  }, [])
  return (
    <>
      <div className="fixed inset-0 -z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 top-0 h-[28rem] w-[28rem] animate-drift rounded-full bg-violet2/25 blur-[110px]" />
        <div className="absolute -right-32 top-1/3 h-[26rem] w-[26rem] animate-drift rounded-full bg-cyan2/20 blur-[110px]" style={{ animationDelay: '-6s' }} />
        <div className="absolute bottom-0 left-1/3 h-[24rem] w-[24rem] animate-drift rounded-full bg-coral/20 blur-[110px]" style={{ animationDelay: '-11s' }} />
      </div>
      <div className="cursor-glow" aria-hidden="true" />
      <AnimatePresence>{intro && <Intro onClose={closeIntro} />}</AnimatePresence>
      <Nav />
      <main className="relative z-10">
        <Hero onIntro={() => setIntro(true)} />
        <About />
        <WhyHire />
        <Experience />
        <Projects />
        <Lab />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  )
}
