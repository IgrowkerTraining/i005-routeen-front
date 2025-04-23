

export interface Exercise {
    name: string;
    description: string;
    img_url: string;
    img_id: string;
    category_id: string;
  }
  
  export interface RoutineExercise {
    order: number;
    reps: number;
    series: number;
    weight_kg: number;
    rest_time_s: number;
    exercise_id: Exercise;
    routine_id: string;
  }