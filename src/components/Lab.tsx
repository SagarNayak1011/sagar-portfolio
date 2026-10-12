import { useMemo, useState } from 'react'
import { av } from '../data'
import { Head } from './Sections'
import Tilt from './Tilt'

const inp = 'w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white outline-none focus:border-cyan2'
const tabs = ['RICE Prioritizer', 'Funnel Analyzer', 'Risk Simulator'] as const

function Rice() {
  const [rows, setRows] = useState([
    { n: 'Category alerts', r: 800, i: 2, c: 80, e: 3 },
    { n: 'Monthly summary report', r: 1200, i: 1, c: 90, e: 2 },
    { n: 'Bank-account sync', r: 1500, i: 3, c: 50, e: 8 },
  ])
  const score = (x: (typeof rows)[0]) => (x.e > 0 ? (x.r * x.i * (x.c / 100)) / x.e : 0)
  const set = (k: number, f: string, v: string) => setRows(rows.map((x, j) => (j === k ? { ...x, [f]: f === 'n' ? v : Number(v) } : x)))
  const ranked = [...rows].sort((a, b) => score(b) - score(a))
  return (
    <div>
      <p className="mb-3 text-sm text-slate-400">Score = Reach × Impact × Confidence ÷ Effort. Edit any value; the ranking updates live.</p>
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 text-xs text-slate-400"><span>Feature</span><span>Reach</span><span>Impact</span><span>Conf %</span><span>Effort</span></div>
      {rows.map((x, k) => (
        <div key={k} className="mt-2 grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2">
          <input aria-label="Feature" className={inp} value={x.n} onChange={(e) => set(k, 'n', e.target.value)} />
          {(['r', 'i', 'c', 'e'] as const).map((f) => <input key={f} aria-label={f} type="number" min={0} className={inp} value={x[f]} onChange={(e) => set(k, f, e.target.value)} />)}
        </div>
      ))}
      <ol className="mt-5 space-y-2">
        {ranked.map((x, i) => (
          <li key={x.n + i} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-2 text-sm">
            <span className="text-white"><b className="mr-2 text-cyan2">#{i + 1}</b>{x.n}</span>
            <span className="font-display text-lg text-amber2">{score(x).toFixed(0)}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Funnel() {
  const [v, setV] = useState([10000, 6200, 3100, 1800, 900])
  const names = ['Visit', 'Sign-up', 'Activation', 'Repeat use', 'Paid']
  const drops = v.map((x, i) => (i === 0 || v[i - 1] === 0 ? 0 : 1 - x / v[i - 1]))
  const worst = drops.indexOf(Math.max(...drops))
  return (
    <div>
      <p className="mb-3 text-sm text-slate-400">Enter stage counts. The tool flags the biggest drop-off, which is where discovery should start.</p>
      {v.map((x, i) => (
        <div key={names[i]} className="mb-2 flex items-center gap-3">
          <span className="w-24 text-xs text-slate-300">{names[i]}</span>
          <input aria-label={names[i]} type="number" min={0} className={`${inp} w-24`} value={x} onChange={(e) => setV(v.map((y, j) => (j === i ? Number(e.target.value) : y)))} />
          <div className="h-5 flex-1 rounded-full bg-white/5">
            <div className="h-5 rounded-full transition-all" style={{ width: `${v[0] ? Math.min(100, (x / v[0]) * 100) : 0}%`, background: i === worst ? '#ff6b5c' : 'linear-gradient(90deg,#22e5ea,#9d5cff)' }} />
          </div>
          <span className="w-24 text-right text-xs text-slate-400">{i ? `−${(drops[i] * 100).toFixed(0)}% step` : '100%'}</span>
        </div>
      ))}
      <p className="mt-4 rounded-xl bg-coral/10 p-3 text-sm text-white">Biggest drop: <b>{names[worst - 1] ?? names[0]} → {names[worst]}</b> ({(drops[worst] * 100).toFixed(0)}% lost). Overall conversion: <b>{v[0] ? ((v[4] / v[0]) * 100).toFixed(1) : 0}%</b>.</p>
    </div>
  )
}

// deterministic synthetic transactions so results are stable
function makeTx() {
  let s = 42
  const rnd = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296)
  const norm = () => Math.sqrt(-2 * Math.log(rnd() + 1e-9)) * Math.cos(2 * Math.PI * rnd())
  return Array.from({ length: 1000 }, (_, i) => {
    const fraud = i % 20 === 0
    const sc = Math.max(0, Math.min(100, fraud ? 72 + norm() * 14 : 25 + norm() * 17))
    return { fraud, sc }
  })
}

function Risk() {
  const tx = useMemo(makeTx, [])
  const [rv, setRv] = useState(45)
  const [bl, setBl] = useState(80)
  const hi = Math.max(rv, bl)
  const allow = tx.filter((t) => t.sc < rv)
  const block = tx.filter((t) => t.sc >= hi)
  const review = tx.length - allow.length - block.length
  const fp = tx.filter((t) => !t.fraud && t.sc >= rv).length
  const fn = allow.filter((t) => t.fraud).length
  return (
    <div>
      <p className="mb-3 text-sm text-slate-400">1,000 <b>synthetic</b> transactions (5% fraud). Move the thresholds and watch the trade-off between false positives, missed fraud and review workload.</p>
      <label className="block text-xs text-slate-300">Review from score ≥ {rv}<input type="range" min={0} max={100} value={rv} onChange={(e) => setRv(Number(e.target.value))} className="w-full accent-cyan2" /></label>
      <label className="mt-2 block text-xs text-slate-300">Block from score ≥ {hi}<input type="range" min={0} max={100} value={bl} onChange={(e) => setBl(Number(e.target.value))} className="w-full accent-coral" /></label>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        {[['Allow', allow.length, '#2ee6a6'], ['Review', review, '#ffb020'], ['Block', block.length, '#ff6b5c']].map(([l, n, c]) => (
          <div key={l as string} className="rounded-xl p-3" style={{ background: `${c}1f`, border: `1px solid ${c}66` }}><div className="font-display text-2xl text-white">{n}</div><div className="text-xs text-slate-300">{l}</div></div>
        ))}
      </div>
      <p className="mt-4 rounded-xl bg-white/5 p-3 text-sm text-white">Legit customers flagged (false positives): <b className="text-amber2">{fp}</b> · Fraud let through (false negatives): <b className="text-coral">{fn}</b></p>
    </div>
  )
}

export default function Lab() {
  const [t, setT] = useState(0)
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-5 py-16 lg:px-8">
      <Head a={av.projects} id="lab" sub="Product Lab" title="Try how I think" />
      <p className="-mt-6 mb-6 max-w-2xl text-sm text-slate-400">Working tools built to demonstrate the frameworks in my case studies. Sample inputs are illustrative, not real company data.</p>
      <Tilt color="#22e5ea" className="p-6">
        <div role="tablist" className="mb-5 flex flex-wrap gap-2">
          {tabs.map((n, i) => (
            <button key={n} role="tab" aria-selected={t === i} onClick={() => setT(i)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${t === i ? 'bg-gradient-to-r from-sky2 to-violet2 text-white' : 'border border-white/15 text-slate-300 hover:text-white'}`}>{n}</button>
          ))}
        </div>
        {t === 0 ? <Rice /> : t === 1 ? <Funnel /> : <Risk />}
      </Tilt>
    </section>
  )
}
