import { Trainer } from './trainer'

export interface AuthTrainerInput {
    email: string
    password: string
}

export interface AuthTrainerResponse {
    trainer: Trainer
}

export interface AuthAthleteInput {
    otp_code: string
}