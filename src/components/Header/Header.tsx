import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/AuthContext'
import { Menu, User, LogOut, Home, Users, Bell, Trophy } from 'lucide-react'

type HeaderProps = {
  profilePicture?: string
  trainerName?: string
  userRole: 'trainer' | 'athlete'
}

export function Header({
  profilePicture = '/images/users/Imagen_perfil-2.png',
  trainerName = 'Entrenador',
  userRole,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
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
    <header className="w-full shadow-md py-3 px-4 bg-notwhite-400">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Vista móvil */}
        <div className="flex w-full items-center justify-between md:hidden">
          {/* Perfil (link al perfil del usuario) */}
          <Link
            to="/profile"
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
                to="/routines"
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
        <nav className="hidden md:flex items-center gap-6 w-full">
          <Link to="/home" className="flex items-center cursor-pointer">
            <img
              src="/images/logo.png"
              alt="Logo Routeen"
              className="h-16 w-auto object-contain"
            />
          </Link>
          <Link
            to="/home"
            className="flex items-center gap-2 text-primary-400 font-sans hover:text-accent-400 cursor-pointer"
          >
            <Home className="h-5 w-5" />
            Inicio
          </Link>
          <Link
            to="/students"
            className="flex items-center gap-2 text-primary-400 font-sans hover:text-accent-400 cursor-pointer"
          >
            <Users className="h-5 w-5" />
            Alumnos
          </Link>
          <Link
            to="/agenda"
            className="flex items-center gap-2 text-primary-400 font-sans hover:text-accent-400 cursor-pointer"
          >
            <Bell className="h-5 w-5" />
            Notificaciones
          </Link>
          <Link
            to="/routines"
            className="flex items-center gap-2 text-primary-400 font-sans hover:text-accent-400 cursor-pointer"
          >
            <Trophy className="h-5 w-5" />
            Biblioteca de rutinas
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-2 text-primary-400 font-sans hover:text-accent-400 ml-auto cursor-pointer"
          >
            <img
              src={profilePicture}
              alt="Perfil"
              className="w-9 h-9 rounded-full object-cover border-2 border-accent-400"
            />
            {trainerName}
          </Link>
        </nav>
      </div>
    </header>
  )
}
