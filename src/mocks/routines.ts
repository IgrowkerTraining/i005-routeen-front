import { Routine } from '../types';

export const routinesMock: Routine[] = [
    {   
        id: "1",
        name: "Tren Superior",
        duration: 60,
        level: "Intermedio",
        exercises: [
            {
                id: "1",
                name: "Press de Pecho",
                sets: 4,
                reps: 12,
                rest: 60,
                weight: 50,
                image: "/images/exercices/bench-press.png",

            },
            {
                id: "2",
                name: "Remo con Barra",
                sets: 4,
                reps: 12,
                rest: 60,
                weight: 45,
                image: "/images/exercices/dumbell-row.png",
            }
        ]
    },
    {
        id: "2",
        name: "Tren Inferior",
        duration: 60,
        level: "Avanzado",
        exercises: [
            {
                id: "3",
                name: "Back Squat",
                sets: 3,
                reps: 10,
                rest: 60,
                weight: 70,
                image: "/images/exercices/back-squat.png",
            },
            {
                id: "4",
                name: "Hip Thrust",
                sets: 4,
                reps: 12,
                rest: 60,
                weight: 60,
                image: "/images/exercices/hip-thrust.png",
            }
        ]
    },
    {
        id: "3",
        name: "Core",
        duration: 30,
        level: "Principiante",
        exercises: [
            {
                id: "5",
                name: "Plancha",
                sets: 3,
                reps: 45,
                rest: 30,
                weight: 0,
                image: "/images/exercices/plank.png",
            },
            {
                id: "6",
                name: "Crunchs",
                sets: 3,
                reps: 20,
                rest: 30,
                weight: 10,
                image: "/images/exercices/crunch.png",
            }
        ]
    },
    {
        id: "4",
        name: "Rutina de Fuerza",
        duration: 90,
        level: "Avanzado",
        exercises: [
            {
                id: "7",
                name: "Press Militar",
                sets: 4,
                reps: 8,
                rest: 90,
                weight: 40,
                image: "/images/exercices/military-press.png",
            },
            {
                id: "8",
                name: "Peso Muerto",
                sets: 4,
                reps: 8,
                rest: 90,
                weight: 80,
                image: "/images/exercices/deadlift.png",
            }
        ]
    },
    {
        id: "5",
        name: "Rutina de Resistencia",
        duration: 60,
        level: "Intermedio",
        exercises: [
            {
                id: "9",
                name: "Burpees",
                sets: 3,
                reps: 15,
                rest: 30,
                weight: 0,
                image: "/images/exercices/burpee.png",
            },
            {
                id: "10",
                name: "Mountain Climbers",
                sets: 3,
                reps: 20,
                rest: 30,
                weight: 0,
                image: "/images/exercices/mountain-climber.png",
            }
        ]
    }
]