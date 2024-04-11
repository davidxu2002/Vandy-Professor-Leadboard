import { Subject } from "./VandyAPI"
import { DayStart } from "./DayStart"
export interface Professor {
    id: string
    name: string
    votes: number
    subject: Subject
    current_place: number
    day_start: DayStart
}