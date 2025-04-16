import { Routine } from '../types';

export const routinesMock: Routine[] = [
    {   
        id: "1",
        name: "Tren Superior",
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
    }
]