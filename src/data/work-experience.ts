import type { WorkExperience } from '@/types'

export const workExperience: WorkExperience[] = [
  {
    id: 'foyer',
    company: 'Foyer',
    role: 'Mobile Lead',
    duration: 'Dec 2024 — Present',
    location: 'Bangalore',
    tagline: 'Two products. One engineer. Zero documentation.',
    description:
      "Sole mobile decision-maker at an early-stage AI startup, shipping two products simultaneously. Merlin AI — a Chrome extension brought to mobile — and Thine, a journaling app that required solving an iOS background audio problem Apple's documentation doesn't cover. Three rewrites. Swift and Objective-C bridging. Audio that survives lock screens and OS kill cycles at 3-4% battery per hour. Not documented anywhere. Alongside the product work, building the mobile team and practice from the ground up.",
    skills: ['Flutter', 'Swift', 'iOS Native', 'AI Integration', 'Team Lead'],
    metrics: [
      { value: '3–4%', label: 'battery/hr' },
      { value: '3', label: 'rewrites' },
      { value: '2', label: 'products' },
    ],
  },
  {
    id: 'appscrip',
    company: 'Appscrip',
    role: 'Senior Flutter Developer',
    duration: 'Oct 2022 — Nov 2024',
    description:
      'One monorepo, four products — healthcare, fintech, transport, and social — with real-time chat, live streaming, and audio/video calling all shipping from it.',
    skills: ['Flutter', 'MVVM', 'Real-time'],
    metrics: [{ value: '4', label: 'products, one codebase' }],
  },
  {
    id: 'primotech',
    company: 'PrimoTech',
    role: 'Software Developer',
    duration: 'Jun 2021 — Sep 2022',
    description:
      'Full rewrites of two debt-ridden codebases, healthcare and EdTech, with 95% of open technical issues resolved in the first six months.',
    skills: ['Flutter', 'Firebase', 'Node.js'],
    metrics: [{ value: '95%', label: 'issues resolved' }],
  },
  {
    id: 'agumentik',
    company: 'Agumentik',
    role: 'Flutter Developer',
    duration: 'Apr 2020 — May 2021',
    description:
      'First production apps. Three clients, fully remote, zero hand-holding — and a 23% improvement in user satisfaction across everything I shipped.',
    skills: ['Flutter', 'Dart', 'UI/UX'],
    metrics: [{ value: '23%', label: 'user satisfaction' }],
  },
]
