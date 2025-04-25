import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import "./Calendar.css";

interface propCalendar {
  selectedDate: (modal: boolean, date?: string) => void;
  maxDate?: string;
  value?: string;
  allowPastDates?: boolean;
}

export default function Calendar({ selectedDate, maxDate, value, allowPastDates = true }: propCalendar) {
  const [currentDate, setCurrentDate] = useState<Date>(value ? new Date(value.split("/").reverse().join("-")) : new Date());
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDateTime = maxDate ? new Date(maxDate) : null;

  useEffect(() => {
    if (value) {
      const [day, month, year] = value.split("/");
      setCurrentDate(new Date(`${year}-${month}-${day}`));
    }
  }, [value]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const limitYear = maxDateTime ? maxDateTime.getFullYear() : currentYear + 10;
    const years = [];
    for (let year = 1970; year <= limitYear; year++) {
      years.push(year);
    }
    return years;
  };

  const isDateDisabled = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    if (!allowPastDates && date < today) return true;
    if (allowPastDates && maxDateTime && date > maxDateTime) return true;
    return false;
  };

  const selectMonth = (monthIndex: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
    setShowMonthSelector(false);
  };

  const selectYear = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setShowYearSelector(false);
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const generateDays = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const offset = firstDayOfMonth === 0 ? 0 : firstDayOfMonth;
    const days = [];

    for (let i = 0; i < offset; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isDisabled = isDateDisabled(currentDateToCheck);
      const isToday = today.toDateString() === currentDateToCheck.toDateString();
      const isSelected = value && formatDate(currentDateToCheck) === value;

      days.push(
        <div
          key={day}
          onClick={() => {
            if (!isDisabled) {
              selectedDate(false, formatDate(currentDateToCheck));
            }
          }}
          className={`grid place-items-center h-10 w-10 cursor-pointer rounded-full text-sm
            ${isDisabled ? "opacity-50 cursor-not-allowed text-gray-400" : "hover:bg-primary hover:text-notblack-400"}
            ${isToday ? "bg-primary font-bold" : ""}
            ${isSelected ? "bg-gray-400 font-bold rounded-full text-accent-400" : ""}`}
        >
          {day}
        </div>
      );
    }

    const totalCells = Math.ceil((daysInMonth + offset) / 7) * 7;
    const emptyCells = totalCells - days.length;

    for (let i = 0; i < emptyCells; i++) {
      days.push(<div key={`empty-end-${i}`} className="day empty"></div>);
    }

    return days;
  };

  return (
    <article className="bg-white rounded-lg shadow-lg p-4 absolute top-full mt-1 z-50 w-[320px]">
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => {
                setShowMonthSelector(!showMonthSelector);
                setShowYearSelector(false);
              }}
              className="text-gray-700 font-medium hover:text-primary flex items-center gap-1"
            >
              {months[currentDate.getMonth()]}
              <ChevronDown className="h-4 w-4" />
            </button>
            {showMonthSelector && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg p-2 grid grid-cols-3 gap-2 w-48 z-50 border border-gray-100">
                {months.map((month, index) => (
                  <button
                    key={`month-${month}`}
                    onClick={() => selectMonth(index)}
                    className={`p-2 hover:bg-primary hover:font-bold hover:text-primary-400 rounded text-sm
                      ${currentDate.getMonth() === index ? "bg-primary text-primary-400 font-bold" : ""}`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setShowYearSelector(!showYearSelector);
                setShowMonthSelector(false);
              }}
              className="text-gray-700 font-medium hover:text-primary flex items-center gap-1"
            >
              {currentDate.getFullYear()}
              <ChevronDown className="h-4 w-4" />
            </button>
            {showYearSelector && (
              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg p-2 w-48 max-h-48 overflow-y-auto scrollbar-custom z-50 border border-gray-100">
                {generateYears().map((year) => (
                  <button
                    key={`year-${year}`}
                    onClick={() => selectYear(year)}
                    className={`p-2 hover:bg-primary hover:font-bold hover:text-primary-400 rounded text-sm w-full text-left
                      ${currentDate.getFullYear() === year ? "bg-primary font-bold text-primary-400" : ""}`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={`day-${day}`} className="text-center text-gray-500 text-sm font-medium">
            {day.charAt(0)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {generateDays()}
      </div>

      <footer className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => selectedDate(false)}
          className="px-4 py-2 text-sm text-gray-600 hover:text-primary"
        >
          Cancel
        </button>
        <button
          onClick={() => selectedDate(false, formatDate(currentDate))}
          className="px-4 py-2 text-sm text-primary hover:text-primary-dark"
        >
          OK
        </button>
      </footer>
    </article>
  );
}