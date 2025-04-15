interface InputProps {
  id?: string
  placeholder?: string
  type?: string
  className?: string
  style?: React.CSSProperties
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string | number
}

export default function Input({
  id,
  placeholder,
  type,
  style,
  className = "",
  onChange,
  value,
}: InputProps) {

  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`bg-transparent border border-secondary-400 w-full px-4 py-2 rounded-md text-black placeholder-gray-400 ${className} focus:outline-gray-500`}
      style={{
        ...style,
        boxShadow: "inset 0 5px 8px -2px rgba(0, 0, 0, 0.2)",
      }}
      onChange={onChange}
      value={value}
    />
  )
}
