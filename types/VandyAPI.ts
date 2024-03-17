export interface Term {
    $id: string;
    name: string;
    term_type: string;
    appx_start: string;
    appx_end: string;
}

export interface Course {
    $id: string;
    course_type: string;
    name: string;
    number: number;
    active: boolean;
    description: string;
    hours: number;
    format: string;
    school: string;
    attributes: string[];
    terms: Term[];
    parent_course: string;
}

export interface Section {
    $id: string;
    section_number: string;
    notes?: string;
    course: string;
    term: string;
    professors: ProfessorRef[];
}

export interface Subject {
    $id: string;
    name: string;
}

export interface ProfessorRef {
    $id: string;
}

export interface Professor {
    $id: string;
    name: string;
    subjects: ProfessorRef[];
}