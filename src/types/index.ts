export type Athlete = {
  id: string
  name: string
  avatar: string
}

export type Exercise = {
  id: string
  name: string
  sets: number 
  reps: number
  rest: number
  weight: number
  image: string
}

export type Routine = {
  id: string
  name: string
  exercises: Exercise[]
}
export type ToastType = "success" | "error" | "info"

export type ToastMessage = {
  id: number
  type: ToastType
  message: string
  isVisible: boolean 
}
