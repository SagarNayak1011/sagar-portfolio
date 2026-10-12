// EDIT CONTENT HERE — all text on the site comes from this file.
export const P = {
  name: 'Sagar Rathod',
  badge: 'APM / Product Management Candidate',
  email: 'sagarnayakrathod@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sagarnayakrathod',
  resume: '/resume/Sagar-Rathod-Resume.pdf',
  phone: '+91 63645 99785',
  loc: 'Kalaburagi, Karnataka',
}

export const av = {
  profile: { src: '/avatars/profile.jpg', color: '#4f9dff', label: 'Profile', href: '#about' },
  education: { src: '/avatars/education.jpg', color: '#2ee6a6', label: 'Education', href: '#education' },
  working: { src: '/avatars/working.jpg', color: '#ffb020', label: 'Experience', href: '#experience' },
  projects: { src: '/avatars/projects.jpg', color: '#22e5ea', label: 'Projects', href: '#projects' },
  contact: { src: '/avatars/contact.jpg', color: '#ff6b5c', label: 'Contact', href: '#contact' },
}

export const journey = [
  { t: 'Engineering', d: 'B.Tech ECE, IIIT Dharwad', c: '#2ee6a6' },
  { t: 'Tech & Product Consulting', d: 'Client problems → solutions', c: '#22e5ea' },
  { t: 'Operations & Analytics', d: 'Workflows, RCA, data-led decisions', c: '#ffb020' },
  { t: 'Product Management', d: 'Structured PM training', c: '#9d5cff' },
]

export const jobs = [
  {
    role: 'Executive – Operations & Analytics',
    org: 'Vayuputra Management Services (VMS)',
    when: 'Nov 2025 – Present',
    c: '#ffb020',
    pts: [
      'Coordinate daily operational workflows, stakeholder dependencies, and escalations to support timely issue resolution and consistent execution.',
      'Conduct root-cause analysis and review operational trends to identify recurring bottlenecks, prioritize issues, and recommend process improvements.',
      'Collaborate with relevant stakeholders to clarify requirements, manage changing priorities, and coordinate follow-up actions on operational issues.',
    ],
  },
  {
    role: 'Independent Technical & Product Consultant',
    org: 'Independent Consulting – Small and Mid-Sized Businesses',
    when: 'Jul 2023 – Oct 2025',
    c: '#22e5ea',
    pts: [
      'Partnered with business owners to identify business, technology, and operational challenges and translate ambiguous requirements into practical solution options.',
      'Evaluated potential solutions against feasibility, implementation effort, stakeholder priorities, and expected business value to support informed decision-making.',
      'Refined recommendations using client feedback and clarified requirements to align proposed solutions with business needs and operational constraints.',
    ],
  },
]

export interface Work {
  title: string; kind: 'Case Study' | 'Teardown'; c: string; line: string
  problem?: string; user?: string
  solution: string[]; decisions?: { d: string; why: string }[]; metrics: string[]
  visual?: 'risk' | 'tower' | 'expense' | 'moscow'
  stages?: string[]; link?: string
}
// Add a real URL in `link` (Notion doc, Figma file, GitHub repo...) and a button appears automatically.
export const work: Work[] = [
  {
    title: 'Real-Time Suspicious Transaction Detection', kind: 'Case Study', c: '#ff6b5c', line: 'Allow / Review / Block risk scoring',
    problem: 'Payments teams must stop fraud quickly without blocking genuine customers. When every suspicious signal is treated the same, review queues grow and good customers get declined.',
    user: 'Fraud-operations analysts (primary); customers whose payments are screened (secondary).',
    solution: [
      'Designed a proposed Allow/Review/Block risk-scoring framework to classify suspicious transactions and route higher-risk cases for investigation.',
      'Mapped transaction signals, decision outcomes, and investigation workflows to structure the proposed product experience and operational handoffs.',
    ],
    decisions: [
      { d: 'Three outcomes instead of approve/decline', why: 'A Review lane keeps borderline cases away from automatic blocks and gives analysts a manageable queue.' },
      { d: 'Judge false positives and false negatives together', why: 'Lowering one raises the other, so thresholds are a deliberate trade-off, not a one-time setting.' },
      { d: 'Treat investigation turnaround as a core metric', why: 'A good score is wasted if flagged cases wait unreviewed.' },
    ],
    metrics: ['False-positive rate', 'False-negative rate', 'Suspicious transaction detection coverage', 'Investigation turnaround time'],
    visual: 'risk',
  },
  {
    title: 'Operations / Logistics Control Tower', kind: 'Case Study', c: '#22e5ea', line: 'SLA-at-risk dashboard for operations',
    problem: 'Operations teams often learn an SLA is breached only after it happens, because exceptions are scattered and nobody clearly owns them.',
    user: 'Operations managers and exception owners in logistics teams.',
    solution: [
      'Designed a proposed SLA-at-risk dashboard with prioritized exceptions, ownership assignment, countdowns, and escalation workflows for operational teams.',
      'Applied Impact-versus-Effort prioritization to scope the MVP around exception visibility, task ownership, and timely escalation.',
    ],
    decisions: [
      { d: 'Exception visibility, ownership and escalation first', why: 'They deliver the most impact for the least effort and fix the "nobody owns it" gap.' },
      { d: 'Defer predictive and automated features', why: 'High effort and unproven until the basic exception workflow is in use.' },
    ],
    metrics: ['SLA breach rate', 'Mean time to resolution', 'Overdue exception count', 'Percentage of exceptions resolved within SLA'],
    visual: 'tower',
  },
  {
    title: 'Monthly Expense Management Product', kind: 'Case Study', c: '#2ee6a6', line: 'Budgeting MVP with spending alerts',
    problem: 'People see overspending only at month end, when it is too late to change behaviour.',
    user: 'Salaried individuals who want a simple monthly budget without maintaining spreadsheets.',
    solution: [
      'Scoped a budgeting MVP with category-level spending visibility, monthly budget tracking, and configurable spending alerts to support expense awareness.',
      'Outlined the user journey, core feature scope, KPI tree, and an A/B testing approach for evaluating alternative alert thresholds.',
    ],
    decisions: [
      { d: 'Category-level visibility, not transaction-level detail', why: 'Keeps the MVP small while still answering "where is my money going?"' },
      { d: 'Alert thresholds treated as a hypothesis', why: 'An A/B test of alternative thresholds shows which timing users act on without alert fatigue.' },
    ],
    metrics: ['Budget adherence', 'Alert engagement rate', 'Monthly active users', 'Repeat usage', 'Percentage of users staying within budget'],
    visual: 'expense',
  },
  {
    title: 'Internal Operations Productivity Tool', kind: 'Case Study', c: '#9d5cff', line: 'One workflow for tasks, SLAs, escalations',
    problem: 'Tasks, SLAs and escalations are tracked in different places, so ownership and status are unclear.',
    user: 'Internal operations teams and the managers who oversee them.',
    solution: [
      'Proposed a unified workflow for task assignment, ownership tracking, SLA monitoring, status updates, and escalation management.',
      'Prioritized proposed MVP capabilities using MoSCoW to distinguish essential workflow features from subsequent enhancements.',
    ],
    decisions: [
      { d: 'Escalation visible from day one', why: 'Stalled work is where operational delay accumulates, so it must not wait for a later release.' },
      { d: 'Hold the MVP to Must-haves', why: 'A focused first release is easier to adopt and to measure.' },
    ],
    metrics: ['Task completion rate', 'Average resolution time', 'SLA compliance', 'Overdue task count', 'Escalation rate'],
    visual: 'moscow',
  },
  {
    title: 'Swiggy', kind: 'Teardown', c: '#ffb020', line: 'Discovery and checkout',
    solution: ['Evaluated user journeys across discovery and checkout to identify potential usability and workflow friction.', 'Proposed improvement opportunities and mapped them to funnel conversion.'],
    stages: ['Discovery', 'Checkout'], metrics: ['Funnel conversion'],
  },
  {
    title: 'Google Pay', kind: 'Teardown', c: '#ff6bd6', line: 'Payment completion',
    solution: ['Evaluated the payment-completion journey to identify potential usability and workflow friction.', 'Proposed improvement opportunities and mapped them to transaction success rate.'],
    stages: ['Payment completion'], metrics: ['Transaction success rate'],
  },
  {
    title: 'WhatsApp', kind: 'Teardown', c: '#4f9dff', line: 'Onboarding to engagement',
    solution: ['Evaluated user journeys across onboarding, messaging, and engagement to identify potential usability and workflow friction.', 'Proposed improvement opportunities and mapped them to activation and user retention.'],
    stages: ['Onboarding', 'Messaging', 'Engagement'], metrics: ['Activation', 'User retention'],
  },
]

export const skills = [
  { g: 'Product Management', c: '#9d5cff', items: ['Product Discovery', 'Product Strategy', 'Product Sense', 'Problem Framing', 'PRDs', 'MVP Definition', 'User Stories', 'Acceptance Criteria', 'User Journeys', 'Roadmaps', 'RICE', 'ICE', 'MoSCoW Prioritization'] },
  { g: 'Product Analytics', c: '#22e5ea', items: ['KPI Trees', 'North Star Metrics', 'Funnel Analysis', 'Cohort Analysis', 'Conversion Analysis', 'Retention', 'Root-Cause Analysis', 'Hypothesis Testing', 'A/B Testing Fundamentals', 'SQL', 'Excel'] },
  { g: 'Technical Skills', c: '#2ee6a6', items: ['C/C++', 'Python', 'OOPs', 'Computer Networking', 'DBMS', 'MySQL', 'Java', 'Git', 'GitHub'] },
  { g: 'Tools', c: '#ff6b5c', items: ['Jira', 'Figma', 'Google Analytics', 'Microsoft Excel', 'Google Sheets', 'Git/GitHub'] },
  { g: 'Execution & Collaboration', c: '#ffb020', items: ['Agile', 'Scrum', 'Kanban', 'Requirements Gathering', 'Stakeholder Management', 'Cross-Functional Coordination', 'Process Optimization', 'Technical Feasibility', 'Prioritization', 'Sprint Planning'] },
]

export const training = ['Product discovery & strategy', 'Product sense & prioritization', 'Product execution & roadmaps', 'Metrics & analytics', 'PRDs & case studies', 'Agile & Scrum', 'Experimentation', 'Stakeholder management']

export const summary = 'Product-focused professional with 3+ years across technical consulting, operations, analytics, stakeholder coordination, and execution. B.Tech graduate from IIIT Dharwad with structured Product Management training in product discovery, strategy, prioritization, PRDs, experimentation, and product execution. Combines engineering fundamentals, analytical problem-solving, and cross-functional coordination to translate business requirements into actionable product solutions and measurable success criteria.'

export const why = [
  { t: 'Speaks engineering', c: '#2ee6a6', d: 'B.Tech in Electronics & Communication (IIIT Dharwad) with hands-on C/C++, Python, Java and MySQL, so conversations on technical feasibility are credible.' },
  { t: 'Operator instincts', c: '#ffb020', d: 'Coordinates daily workflows and escalations at VMS and uses root-cause analysis to find recurring bottlenecks instead of patching symptoms.' },
  { t: 'Metrics-first thinking', c: '#22e5ea', d: 'Every case study defines success metrics up front: KPI trees, funnels, SLAs and A/B test design, supported by SQL and Excel.' },
  { t: 'Structured product craft', c: '#9d5cff', d: 'Four proposed case studies and three teardowns using RICE, MoSCoW, Impact-vs-Effort and MVP scoping.' },
]
