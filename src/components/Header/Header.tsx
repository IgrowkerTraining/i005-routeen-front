import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, User, LogOut, Settings } from 'lucide-react'

type HeaderProps = {
  profilePicture?: string
  trainerName?: string
}

export function Header({
  profilePicture = '/images/users/Imagen_perfil-2.png',
  trainerName = 'Entrenador',
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="w-full shadow-md py-3 px-4 bg-notwhite-400">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/home" className="text-xl font-conthrax text-primary-400">
          Routeen
        </Link>

        <div className="relative">
          <button
            onClick={toggleMenu}
            className="flex items-center gap-2 focus:outline-none"
          >
            <img
              src={profilePicture}
              alt="Foto de perfil"
              className="w-10 h-10 rounded-full object-cover border-2 border-accent-400"
            />
            <span className="hidden sm:block font-medium text-primary-400">
              {trainerName}
            </span>
            <ChevronDown className="h-4 w-4 text-secondary-400" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10 bg-notwhite-400">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm text-primary-400 font-sans hover:bg-accent-400 hover:text-[#121f33]"
              >
                <User className="h-4 w-4" />
                Perfil
              </Link>
              <Link
                to="/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-primary-400 font-sans hover:bg-accent-400 hover:text-[#121f33]"
              >
                <Settings className="h-4 w-4" />
                Configuración
              </Link>
              <Link
                to="/logout"
                className="flex items-center gap-2 px-4 py-2 text-sm text-primary-400 font-sans hover:bg-accent-400 hover:text-[#121f33]"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
