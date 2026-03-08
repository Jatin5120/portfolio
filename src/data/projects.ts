import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'thine',
    title: 'Thine',
    tagline: 'The iOS Audio Recording Challenge That Seemed Impossible',
    description:
      "Building 24x7 audio recording on iOS isn't just hard—it's a battle with the platform itself. iOS kills background audio for battery reasons, interrupts for calls and notifications, and limits what apps can do when users lock their screens.\n\nI spent 2-3 months rewriting this feature three times. Started in Flutter, moved to Swift, then bridged Swift with Objective-C to work around iOS's deepest constraints. The problem wasn't just keeping audio alive—it was doing it without destroying battery life or crashing under memory pressure.\n\nThe result: 24x7 recording that uses only 3-4% battery per hour. Handles interruptions gracefully. Runs in the background without iOS killing it. A feature that seemed impossible became the core capability that makes Thine work.\n\nLaunching on the App Store soon. This is the hardest technical problem I've solved.",
    techStack: ['iOS Native', 'Swift', 'Objective-C Bridge', 'Flutter', 'Background Audio'],
    status: 'launching-soon',
    ctaText: 'Launching Soon',
    ctaLink: '#',
    category: 'ai',
  },
  {
    id: 'merlin-ai',
    title: 'Merlin AI',
    tagline: 'AI-Powered Mobile Product at Scale',
    description:
      "Merlin AI is a consumer AI product that needed to feel fast, smart, and reliable across iOS and Android. The challenge wasn't just integrating AI—it was making the experience feel instant even when processing happens in the background.\n\nBuilt with Flutter for cross-platform consistency, with careful architecture to handle AI response streaming, background processing, and offline fallbacks. The goal was simple: AI should feel like magic, not like waiting.\n\nLive on both App Store and Play Store. Used by thousands of people who expect AI to just work.",
    techStack: ['Flutter', 'AI Integration', 'Streaming Responses', 'Background Processing', 'Offline-first'],
    status: 'live',
    ctaText: 'View on App Store',
    ctaLink: '#',
    category: 'ai',
  },
  {
    id: 'notetaker-ai',
    title: 'NoteTaker AI',
    tagline: 'Audio Transcription and AI Summaries for Seamless Note-Taking',
    description:
      "Built at Foyer to solve the problem of capturing and organizing information quickly. Audio transcription, OCR for images, and AI-powered summaries—all designed to make note-taking effortless.\n\nThe technical challenge was making multiple AI services feel like one seamless experience. Transcription needs to be fast, OCR needs to be accurate, and summaries need to be useful—not just technically impressive.\n\nFocused on the craft: smooth transitions, instant feedback, and an interface that stays out of the way. The best note-taking app is the one you forget you're using.",
    techStack: ['Flutter', 'Audio Transcription', 'OCR Integration', 'AI Summarization', 'Real-time Processing'],
    status: 'live',
    ctaText: 'View Details',
    ctaLink: '#',
    category: 'ai',
  },
  {
    id: 'bonkers',
    title: 'Bonkers',
    tagline: 'Community-Driven AI Art Generation Platform',
    description:
      "An AI art generation platform where the community creates, shares, and discovers art. The technical challenge was making AI-generated images feel instant while managing server load, user-generated content at scale, and a social feed that actually felt social.\n\nBuilt the mobile experience to prioritize speed and discovery. Image generation happens in the background, the feed stays smooth even with thousands of images, and sharing feels native to each platform.\n\nThe craft here was balance: powerful AI features that don't overwhelm the interface, social features that don't distract from creation. Community-driven products live or die on how they feel to use.",
    techStack: ['Flutter', 'AI Image Generation', 'Real-time Feed', 'UGC Management', 'Social Sharing'],
    status: 'live',
    ctaText: 'View Details',
    ctaLink: '#',
    category: 'ai',
  },
  {
    id: 'onrise',
    title: 'Onrise',
    tagline: 'Custom Apparel E-Commerce That Scales',
    description:
      "A custom apparel platform where users design their own products and get them delivered. The challenge was making customization feel simple while managing complex product variations, real-time previews, and a checkout flow that doesn't lose customers.\n\nBuilt both the consumer app and admin panel. Focused on making the design-to-purchase flow feel effortless—live previews, simple customization tools, and a checkout process that actually converts.\n\nLive at onrise.in. E-commerce is hard because every second of friction costs revenue. The goal was speed and simplicity without sacrificing creative control.",
    techStack: ['Flutter', 'Admin Panel', 'Real-time Customization', 'E-commerce Flow', 'Payment Integration'],
    status: 'live',
    ctaText: 'Visit Site',
    ctaLink: 'https://onrise.in',
    category: 'apps',
  },
  {
    id: 'salonpay',
    title: 'SalonPay',
    tagline: "60% Faster: Rebuilding a FinTech App's Performance",
    description:
      "SalonPay is a FinTech platform for salon payments. When I joined, the app took 4.2 seconds to start. In FinTech, slow startup means users abandon before they even see your product.\n\nI led a complete architecture migration to MVVM with clean dependency injection. Removed unused dependencies, optimized initialization, and rebuilt critical paths. The codebase got 40% smaller and infinitely more maintainable.\n\nResult: 1.6-second startup. 60% faster than before, zero regressions, and a codebase that's actually a joy to work with. Live at salonpay.app.",
    techStack: ['Flutter', 'MVVM Architecture', 'Riverpod', 'Performance Profiling', 'Modular Architecture'],
    status: 'live',
    ctaText: 'View Site',
    ctaLink: 'https://salonpay.app',
    category: 'apps',
  },
  {
    id: 'indus',
    title: 'Indus',
    tagline: 'Cross-Platform Mobile Product at Appscrip',
    description:
      "A mobile product built at Appscrip that needed to ship fast without compromising quality. The challenge was balancing speed with craft—delivering features quickly while maintaining architecture that could scale.\n\nBuilt with Flutter for cross-platform reach. Focused on modular architecture so new features wouldn't break existing ones, and clean patterns that other developers could extend without friction.\n\nLive on both stores. Shipping fast matters, but shipping sustainably matters more.",
    techStack: ['Flutter', 'Modular Architecture', 'Cross-platform', 'Clean Code Patterns'],
    status: 'live',
    ctaText: 'View on Stores',
    ctaLink: '#',
    category: 'apps',
  },
  {
    id: 'vief',
    title: 'Vief + Vief Patient',
    tagline: 'Healthcare Platform: Provider and Patient Apps',
    description:
      "Healthcare is complex. Vief needed two apps—one for providers, one for patients—that worked together seamlessly. Scheduling, medical records, real-time communication, compliance with healthcare regulations. Every feature had to be reliable because people's health was on the line.\n\nBuilt both apps with shared architecture where it made sense, and separate flows where each audience needed different experiences. The challenge was making healthcare software feel approachable without sacrificing the seriousness it requires.\n\nThe craft here was empathy: medical providers need efficiency, patients need clarity. Both need trust.",
    techStack: ['Flutter', 'Dual Apps', 'Shared Architecture', 'HIPAA Compliance', 'Real-time Communication'],
    status: 'live',
    ctaText: 'View Details',
    ctaLink: 'https://vief.health',
    category: 'apps',
  },
  {
    id: 'packages',
    title: 'chat_package + livestream_package',
    tagline: 'Private Monorepo Packages for Team Velocity',
    description:
      "At Appscrip, I built reusable packages for chat and livestream functionality that got used across 4 different products. The goal wasn't just code reuse—it was velocity. Instead of rebuilding chat for every app, teams could integrate a tested package in hours, not weeks.\n\nThese were private monorepo packages, not public releases. Built with clean APIs, comprehensive documentation, and architecture that could flex for different product needs without breaking.\n\nThe impact was speed: teams shipped features faster, bugs got fixed once instead of four times, and I could focus on making the packages better instead of debugging the same problems across products.",
    techStack: ['Flutter', 'Monorepo', 'Clean API Design', 'WebSockets', 'Livestream Integration'],
    ctaText: 'View Architecture',
    ctaLink: '#',
    category: 'packages',
  },
]
