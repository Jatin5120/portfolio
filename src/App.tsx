import { useState, useEffect, useRef } from 'react'
import { MotionConfig } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/sections/Hero'
import { Work } from '@/sections/Work'
import { Projects } from '@/sections/Projects'
import { About } from '@/sections/About'
import { Contact } from '@/sections/Contact'

// Track which section is in view for the nav active state
const SECTION_IDS = ['hero', 'work', 'projects', 'about', 'contact']

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    const observer = observerRef.current
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
    <div className="bg-page min-h-screen">
      <Header activeSection={activeSection} />

      <main>
        <Hero />
        <Work />
        <Projects />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
    </MotionConfig>
  )
}
