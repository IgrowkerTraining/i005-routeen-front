export default function reverseDate(inputDate: string): string {
  const [day, month, year] = inputDate.split(/[/-]/)
  return `${year}-${month}-${day}`
}
