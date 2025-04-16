export type Athlete = {
  id: string
  name: string
  avatar: string
}

export type ToastType = "success" | "error" | "info"

export type ToastMessage = {
  id: number
  type: ToastType
  message: string
  isVisible: boolean 
}