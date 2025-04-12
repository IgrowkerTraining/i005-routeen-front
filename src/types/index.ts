export type Athlete = {
  id: string
  name: string
  avatar: string
}

export type goatToastType = "success" | "error" | "info"

export type ToastMessage = {
  id: number
  type: goatToastType
  message: string
  isVisible: boolean 
}
