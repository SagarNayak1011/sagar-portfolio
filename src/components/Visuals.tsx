import type { ReactNode } from 'react'

const Tag = ({ children }: { children: ReactNode }) => <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">{children}</p>
const Chip = ({ c, children }: { c: string; children: ReactNode }) => (
  <span className="rounded-lg px-2.5 py-1.5 text-center text-xs font-medium text-white" style={{ background: `${c}22`, border: `1px solid ${c}66` }}>{children}</span>
)
const Arrow = () => <span className="self-center text-slate-500" aria-hidden="true">→</span>

function Risk() {
  return (
    <div>
      <Tag>Artifact · proposed decision flow</Tag>
      <div className="flex flex-wrap items-stretch gap-2">
        <div className="flex flex-1 flex-col gap-1.5"><Chip c="#4f9dff">Amount</Chip><Chip c="#4f9dff">Device</Chip><Chip c="#4f9dff">Velocity</Chip><Chip c="#4f9dff">Location</Chip></div>
        <Arrow />
        <div className="flex flex-1 items-center justify-center rounded-xl border border-violet2/60 bg-violet2/15 p-3 text-center text-sm font-semibold text-white">Risk score<br />0 – 100</div>
        <Arrow />
        <div className="flex flex-1 flex-col gap-1.5"><Chip c="#2ee6a6">Allow · low</Chip><Chip c="#ffb020">Review · medium → analyst</Chip><Chip c="#ff6b5c">Block · high</Chip></div>
      </div>
      <p className="mt-2 text-xs text-slate-500">Signal names are illustrative examples of the kinds of inputs a scoring model could use. Try the thresholds live in the Product Lab.</p>
    </div>
  )
}

function Tower() {
  const rows = [['Exception A', '00:42', 'Owner 1', 'Escalate', '#ff6b5c'], ['Exception B', '02:10', 'Owner 2', 'At risk', '#ffb020'], ['Exception C', '05:30', 'Owner 1', 'On track', '#2ee6a6']]
  const dots = [['Exception feed', 20, 14], ['Ownership', 36, 30], ['SLA countdown', 62, 22], ['Escalation routing', 30, 56], ['Predictive ETA', 82, 86]] as const
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <Tag>Artifact · dashboard concept (illustrative)</Tag>
        <div className="space-y-1.5 rounded-xl border border-white/10 bg-black/30 p-2 text-xs">
          <div className="grid grid-cols-4 px-2 text-[10px] uppercase text-slate-500"><span>Exception</span><span>Countdown</span><span>Owner</span><span>Status</span></div>
          {rows.map(([a, b, c, d, col]) => (
            <div key={a} className="grid grid-cols-4 items-center rounded-lg bg-white/5 px-2 py-1.5 text-slate-200"><span>{a}</span><span className="font-mono">{b}</span><span>{c}</span><span className="font-semibold" style={{ color: col }}>{d}</span></div>
          ))}
        </div>
      </div>
      <div>
        <Tag>Artifact · impact vs effort</Tag>
        <div className="relative h-40 rounded-xl border border-white/10 bg-black/30">
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/10" /><div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
          <span className="absolute left-1.5 top-1 text-[9px] text-mint">MVP: high impact, low effort</span>
          <span className="absolute bottom-1 right-1.5 text-[9px] text-slate-500">Later</span>
          {dots.map(([n, x, y]) => (
            <span key={n} className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] text-white" style={{ left: `${x}%`, top: `${y}%`, background: x < 50 ? '#22e5ea55' : '#ffffff1f' }}>{n}</span>
          ))}
        </div>
        <p className="mt-1 text-[10px] text-slate-500">Vertical: impact ↑ · Horizontal: effort →</p>
      </div>
    </div>
  )
}

function Expense() {
  return (
    <div className="space-y-5">
      <div>
        <Tag>Artifact · proposed user journey</Tag>
        <div className="flex flex-wrap gap-2">
          {['Set monthly budget', 'Track categories', 'Receive alert', 'Adjust spending', 'Monthly review'].map((s, i) => (
            <span key={s} className="flex items-center gap-2"><Chip c="#2ee6a6">{i + 1}. {s}</Chip>{i < 4 && <Arrow />}</span>
          ))}
        </div>
      </div>
      <div>
        <Tag>Artifact · KPI tree</Tag>
        <div className="rounded-xl border border-mint/50 bg-mint/10 p-2 text-center text-sm font-semibold text-white">% of users staying within budget</div>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">{['Budget adherence', 'Alert engagement rate', 'Monthly active users', 'Repeat usage'].map((k) => <Chip key={k} c="#22e5ea">{k}</Chip>)}</div>
      </div>
      <div>
        <Tag>Artifact · A/B test design (a plan, not results)</Tag>
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-200">
          <div className="rounded-xl bg-white/5 p-2.5"><b className="text-white">Variant A</b> — earlier alert threshold</div>
          <div className="rounded-xl bg-white/5 p-2.5"><b className="text-white">Variant B</b> — later alert threshold</div>
        </div>
        <p className="mt-1 text-xs text-slate-500">Compare alert engagement rate and share of users within budget.</p>
      </div>
    </div>
  )
}

function Moscow() {
  const cols: [string, string, string[]][] = [
    ['Must', '#ff6b5c', ['Task assignment', 'Ownership tracking', 'SLA monitoring', 'Escalation management']],
    ['Should', '#ffb020', ['Status updates']],
    ['Could', '#22e5ea', ['Summary reporting']],
    ["Won't (yet)", '#64748b', ['Workflow automation rules']],
  ]
  return (
    <div>
      <Tag>Artifact · MoSCoW scope for the MVP</Tag>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {cols.map(([t, c, items]) => (
          <div key={t} className="rounded-xl p-2.5" style={{ background: `${c}1a`, border: `1px solid ${c}55` }}>
            <b className="text-xs" style={{ color: c }}>{t}</b>
            <ul className="mt-1.5 space-y-1 text-xs text-slate-200">{items.map((i) => <li key={i}>• {i}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Visual({ k }: { k: 'risk' | 'tower' | 'expense' | 'moscow' }) {
  return k === 'risk' ? <Risk /> : k === 'tower' ? <Tower /> : k === 'expense' ? <Expense /> : <Moscow />
}
