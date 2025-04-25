export interface Trainer {
  _id: string
  name: string
  email: string
  password: string
  role: 'trainer'
  phone: string
  date_birth: string
  profile_picture_url: string
}

export interface TrainerBasic {
  id: string
  name: string
  role: 'trainer'
}


export interface TrainerId {
  trainer_id: string
}

export interface TrainerGetStudent {
  trainer_id: string
  athlete_id: string
}

export interface RegisterTrainerInput {
  name: string
  email: string
  password: string
  phone: string
  date_birth: string
}

export interface RoutineAssigned {
    routine_id: Routine
    athlete_id: string
    description: string
    assignment_date: string
    _id: string
    name: string;
    _id: string
}

export interface Routine {
    _id: string;
    name: string;
    description: string;
    trainer_id: string;
    difficulty: string;
    duration: string;
    id: string;
    routine_id: {
        _id: string,
        name: string,
        description: string,
        difficulty: string,
        duration: string
    }
}
