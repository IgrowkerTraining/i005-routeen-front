import { useState } from 'react'

interface InputProps {
  id?: string
  placeholder?: string
  type?: string
  className?: string
  style?: React.CSSProperties
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string | number
  label?: boolean
  showIcon?: boolean
  required?: boolean
  error?: string
}

export default function Input({
  id,
  placeholder,
  type = 'text',
  style,
  className = '',
  onChange,
  value,
  label = false,
  showIcon = false,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const isActive =
    isFocused ||
    (value && (typeof value === 'string' ? value.length > 0 : value > 0))

  return (
    <div className="relative flex flex-col w-full">
      {label && placeholder && (
        <label
          htmlFor={id}
          className={`
            absolute left-4 transition-all duration-300  text-sm text-gray-600 font-bold pointer-events-none
            ${isActive ? 'top-1 font-thin ' : 'top-4'}
          `}
        >
          {placeholder}
        </label>
      )}

      <input
        id={id}
        type={type}
        placeholder={label ? ' ' : placeholder}
        className={`bg-transparent border border-secondary-400 w-full px-4 pt-6 pb-1 rounded-md text-notblack-400 font-bold placeholder-gray-300 ${className} focus:outline-gray-500`}
        style={{
          ...style,
          boxShadow: 'inset 0 5px 8px -2px rgba(0, 0, 0, 0.2)',
        }}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
      />

      {showIcon && (
        <i className="bi bi-pencil absolute right-3 top-1/2 transform -translate-y-1/2 text-notblack-400"></i>
      )}
    </div>
  )
}
