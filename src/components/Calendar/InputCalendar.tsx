import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import Calendar from "./Calendar";

interface InputCalendarProps {
  id?: string
  label?: string
  placeholder?: string
  isRequired?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  value?: string
  maxDate?: string
  allowPastDates?: boolean
}

export default function InputCalendar({
  id,
  label,
  isRequired,
  placeholder,
  onChange,
  error,
  value,
  maxDate = new Date().toISOString().split('T')[0],
  allowPastDates = true
}: InputCalendarProps) {
  const [toggleCalendar, setToggleCalendar] = useState<boolean>(false)
  const [currentDate, setCurrentDate] = useState(value || "")
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (value !== currentDate) {
      setCurrentDate(value || "");
    }
  }, [value])

  const isActive = isFocused || (currentDate && currentDate.length > 0)

  const handleValueCalendar = (toggle: boolean, value?: string) => {
    setToggleCalendar(toggle)
    if (value) {
      setCurrentDate(value)
      if (onChange) {
        onChange({
          target: { value }
        } as React.ChangeEvent<HTMLInputElement>)
      }
    }
  }

  return (
    <div className="relative flex flex-col w-full">
      {label && (
        <label
          htmlFor={id}
          className={`
            absolute left-4 transition-all duration-300 text-sm text-gray-600 font-bold pointer-events-none
            ${isActive ? "top-1 font-thin" : "top-4"}
            ${isRequired ? 'after:content-["*"] after:text-customRed' : ""}
          `}
        >
          {error ? `Ops! ${error}` : label}
        </label>
      )}
      <input
        id={id}
        type="text"
        placeholder={label ? " " : placeholder}
        value={currentDate}
        className={`bg-transparent border border-secondary-400 w-full px-4 pt-6 pb-1 rounded-md text-notblack-400 font-bold placeholder-gray-300 focus:outline-gray-500`}
        style={{
          boxShadow: "inset 0 5px 8px -2px rgba(0, 0, 0, 0.2)",
        }}
        readOnly
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}

      />
      <CalendarDays
        color={`#${error ? "fa8080" : "6b7280"}`}
        onClick={() => setToggleCalendar(!toggleCalendar)}
        className={`cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 ${toggleCalendar ? "hidden" : ""
          }`}
      />
      {toggleCalendar && (
        <Calendar
          selectedDate={handleValueCalendar}
          maxDate={maxDate}
          value={currentDate}
          allowPastDates={allowPastDates}
        />
      )}
    </div>
  )
}
