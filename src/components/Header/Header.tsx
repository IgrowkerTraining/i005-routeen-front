import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'
import { Menu, User, LogOut, Home, Users, Bell, Trophy } from 'lucide-react'

type HeaderProps = {
  profilePicture?: string
  trainerName?: string
  userRole: 'trainer' | 'athlete'
}

export function Header({ profilePicture, trainerName, userRole }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault()
    await logout()
    navigate('/')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <header className="w-full shadow-md py-3 px-4 bg-notwhite-400 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Vista móvil */}
        <div className="flex w-full items-center justify-between md:hidden">
          {/* Perfil */}
          <Link
            to="/"
            className="flex items-center gap-2 cursor-pointer"
            onClick={closeMenu}
          >
            <img
              src={profilePicture}
              alt="Foto de perfil"
              className="w-12 h-12 rounded-full object-cover border-2 border-accent-400"
            />
          </Link>

          {/* Botón menú */}
          <button
            onClick={toggleMenu}
            className="focus:outline-none cursor-pointer"
          >
            <Menu className="h-8 w-8 text-secondary-400" />
          </button>
        </div>

        {/* Menú desplegable móvil */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute right-4 top-20 w-56 rounded-md shadow-lg py-2 z-10 bg-notwhite-400"
          >
            <Link
              to="/profile"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-2 text-sm text-primary-400 font-sans hover:bg-accent-400 hover:text-[#121f33] cursor-pointer"
            >
              <User className="h-5 w-5" />
              Cuenta
            </Link>
            <Link
              to="/notifications"
              className="flex items-center gap-3 px-4 py-2 text-sm text-primary-400 font-sans hover:bg-accent-400 hover:text-[#121f33] cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              Notificaciones
            </Link>
            {userRole === 'trainer' && (
              <Link
                to="/library"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm text-primary-400 font-sans hover:bg-accent-400 hover:text-[#121f33] cursor-pointer"
              >
                <Trophy className="h-5 w-5" />
                Biblioteca de rutinas
              </Link>
            )}
            {/* Espacio antes del botón de cerrar sesión */}
            <div className="mt-8" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-primary-400 font-sans hover:bg-accent-400 hover:text-[#121f33] cursor-pointer"
            >
              <LogOut className="h-5 w-5" />
              Cerrar sesión
            </button>
          </div>
        )}

        {/* Navbar escritorio */}
        <nav className="hidden md:flex items-center w-full gap-4 overflow-x-auto">
          {/* Logo a la izquierda */}
          <Link to="/home" className="flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="Logo Routeen"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Botones centrales */}
          <div className="flex flex-1 justify-evenly items-center gap-4 min-w-0">
            <Link
              to="/home"
              className="flex items-center gap-1.5 text-primary-400 font-sans hover:text-accent-400 whitespace-nowrap"
            >
              <Home className="h-5 w-5 md:h-4 md:w-4 min-w-[16px] flex-shrink-0" />
              Inicio
            </Link>
            {userRole === 'trainer' && (
              <Link
                to="/students"
                className="flex items-center gap-1.5 text-primary-400 font-sans hover:text-accent-400 whitespace-nowrap"
              >
                <Users className="h-5 w-5 md:h-4 md:w-4 min-w-[16px] flex-shrink-0" />
                Alumnos
              </Link>
            )}
            <Link
              to="/agenda"
              className="flex items-center gap-1.5 text-primary-400 font-sans hover:text-accent-400 whitespace-nowrap"
            >
              <Bell className="h-5 w-5 md:h-4 md:w-4 min-w-[16px] flex-shrink-0" />
              Notificaciones
            </Link>
            {userRole === 'trainer' && (
              <Link
                to="/library"
                className="flex items-center gap-1.5 text-primary-400 font-sans hover:text-accent-400 whitespace-nowrap"
              >
                <Trophy className="h-5 w-5 md:h-4 md:w-4 min-w-[16px] flex-shrink-0" />
                Biblioteca de rutinas
              </Link>
            )}
          </div>

          {/* Perfil y logout */}
          <div className="flex items-center gap-3 ml-4 flex-shrink-0">
            <Link
              to="/profile"
              className="flex items-center gap-1.5 text-primary-400 font-sans hover:text-accent-400 whitespace-nowrap"
            >
              <img
                src={profilePicture}
                alt="Perfil"
                className="w-9 h-9 rounded-full object-cover border-2 border-accent-400"
              />
              <span className="hidden lg:inline">{trainerName}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-primary-400 font-sans hover:text-accent-400 whitespace-nowrap"
            >
              <LogOut className="h-5 w-5 md:h-4 md:w-4 min-w-[16px] flex-shrink-0" />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
