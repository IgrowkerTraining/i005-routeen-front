import { Trainer } from './trainer'

export interface AuthTrainerInput {
    email: string
    password: string
}

export interface AuthTrainerResponse {
    token: string
    trainer: Trainer
}

export interface AuthAthleteInput {
    otp_code: string
}