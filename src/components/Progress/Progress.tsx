import { useEffect, useState } from 'react'

type ExerciseEntry = {
  id: string
  name: string
  date: string
  sets: number
  reps: number
  weight: number
}

type Props = {
  athleteId: string
}

export default function Progress({ athleteId }: Props) {
  const [entries, setEntries] = useState<ExerciseEntry[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    //TODO hacer una solicitud a la base de datos
    const fetchProgress = async () => {
      const mockData: ExerciseEntry[] = [
        {
          id: '1',
          name: 'Press Banca',
          date: '2025-04-10',
          sets: 3,
          reps: 10,
          weight: 80,
        },
        {
          id: '4',
          name: 'Press Banca',
          date: '2025-04-17',
          sets: 3,
          reps: 10,
          weight: 100,
        },
        {
          id: '2',
          name: 'Sentadilla',
          date: '2025-04-08',
          sets: 4,
          reps: 8,
          weight: 100,
        },
        {
          id: '5',
          name: 'Sentadilla',
          date: '2025-04-02',
          sets: 4,
          reps: 8,
          weight: 90,
        },
        {
          id: '3',
          name: 'Peso Muerto',
          date: '2025-04-07',
          sets: 3,
          reps: 6,
          weight: 120,
        },
        {
          id: '6',
          name: 'Peso Muerto',
          date: '2025-04-01',
          sets: 3,
          reps: 6,
          weight: 110,
        },
      ]

      setEntries(mockData)
    }

    fetchProgress()
  }, [athleteId])

  const filtered = entries.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  )

  const grouped = filtered.reduce<Record<string, ExerciseEntry[]>>(
    (acc, entry) => {
      if (!acc[entry.name]) {
        acc[entry.name] = []
      }
      acc[entry.name].push(entry)
      return acc
    },
    {}
  )

  return (
    <section className="w-full">
      <h3 className="text-xl font-semibold text-notblack-400 mb-2">
        Historial de Ejercicios
      </h3>

      <input
        type="text"
        placeholder="Buscar ejercicio..."
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-6">
        {Object.entries(grouped).map(([name, logs]) => (
          <div
            key={name}
            className="p-4 bg-white rounded-lg shadow-md text-primary-400"
          >
            <h4 className="text-lg font-bold mb-2">{name}</h4>
            <ul className="space-y-1 text-sm text-secondary-400">
              {logs
                .sort(
                  (b, a) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                )
                .map((entry) => (
                  <li key={entry.id}>
                    {new Date(entry.date).toLocaleDateString()} – {entry.sets}{' '}
                    sets x {entry.reps} reps @ {entry.weight}kg
                  </li>
                ))}
            </ul>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-secondary-400">No se encontraron ejercicios.</p>
        )}
      </div>
    </section>
  )
}
