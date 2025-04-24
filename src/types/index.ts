export type Athlete = {
  _id: string;
  role: "athlete";
  name: string;
  email: string;
  phone: string;
  date_birth: string;
  goals: string;
  weight: string;
  height: string;
  gender: "male" | "female";
  injuries: string;
  trainer_id: string;
  avatar: string;
};

export type Exercise = {
  _id: string
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
  duration?: number
  level?: string
}
export type ToastType = "success" | "error" | "info"

export type ToastMessage = {
  id: number
  type: ToastType
  message: string
  isVisible: boolean 
}

