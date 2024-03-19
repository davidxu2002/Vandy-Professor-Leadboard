import { ProfessorRef, Subject } from "./VandyAPI"

export interface Professor {
    id: string
    name: string
    votes: number
    subjects: ProfessorRef[]
}