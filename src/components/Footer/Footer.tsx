import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Dumbbell } from 'lucide-react'

export function Footer() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <footer
      className="w-full shadow-[0_-2px_10px_rgba(0,0,0,0.05)] py-3 px-4 mt-auto"
      style={{ backgroundColor: 'var(--color-notwhite-400)' }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/students"
          className="flex flex-col items-center gap-1 px-4 py-2 transition-colors"
          style={{
            color:
              hoveredItem === 'students'
                ? 'var(--color-accent-400)'
                : 'var(--color-primary-400)',
            fontFamily: 'var(--font-sans)',
          }}
          onMouseEnter={() => setHoveredItem('students')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Users className="h-6 w-6" />
          <span
            className="text-sm tracking-wide"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            Alumnos
          </span>
        </Link>

        <Link
          to="/routines"
          className="flex flex-col items-center gap-1 px-4 py-2 transition-colors"
          style={{
            color:
              hoveredItem === 'routines'
                ? 'var(--color-accent-400)'
                : 'var(--color-primary-400)',
            fontFamily: 'var(--font-sans)',
          }}
          onMouseEnter={() => setHoveredItem('routines')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Dumbbell className="h-6 w-6" />
          <span
            className="text-sm tracking-wide"
            style={{ fontFamily: 'var(--font-bebas)' }}
          >
            Rutinas
          </span>
        </Link>
      </div>
    </footer>
  )
}
