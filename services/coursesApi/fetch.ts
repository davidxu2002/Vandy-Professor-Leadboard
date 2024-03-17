import {Course, Section, Subject} from "@/types/VandyAPI";
import {Professor} from "@/types/Professor";

const baseEndpoint = "https://courses.clubfair.io/v1"

// const header = "Bearer " + process.env.API_BEARER_TOKEN;
const header = "Bearer " + 'at_cc07ba0eaef340c3806bd64674cc03d2';

enum Endpoint {
    TERMS = "/terms",
    TERM_COURSES = "/term/courses",
    COURSE_SECTIONS = "/term/course/sections",
    PROFESSOR = "/professor",
    SUBJECT = "/subject"
}

const endpoint = (path: Endpoint) => baseEndpoint + path;

const fetchData = (path: Endpoint, body?: object) => fetch(endpoint(path), {
    method: "POST",
    headers: {
        authorization: header,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
})
    .then(response => response.json())
    .then(data => {
        return data.error ? Promise.reject(data.error) : data.data
    })

export const fetchCourses = async (termId: string, page: number): Promise<Course[]> => fetchData(Endpoint.TERM_COURSES, {
    term_id: termId,
    pagination: {
        page: page,
        page_size: 100
    }
})
    .then(courses => courses as Course[])
    .then(courses => {
        return courses.map(course => ({
            ...course,
            $id: course.$id.replace(" ", "_")
        }))
    })
    .catch((e) => {
        console.log(e);
        return [];
    });

export const fetchProfessors = async (course_id: string): Promise<Professor[]> => {
    return await fetchData(Endpoint.COURSE_SECTIONS, {
        term_id: "1000",
        course_id
    })
        .then(sections => sections as Section[])
        .then(sections => sections.map(section => section.professors))
        .then(professorArrays => Promise.all(
            professorArrays.map(professors => Promise.all(
                professors.map(professor => fetchProfessor(professor.$id))
            ))))
        .then(professorArrays => professorArrays.flat())
}

export const fetchAllProfessors = async (termId: string, page: number): Promise<Professor[]> => {
    const courses = await fetchCourses(termId, page);
    const professorsArray = await Promise.all(courses.map(course => fetchProfessors(course.$id.replace("_", " "))));
    const professors = professorsArray.flat();
    return professors.filter((professor, index, self) => self.findIndex(p => p.id === professor.id) === index);
}

const fetchProfessor = async (professorId: string): Promise<Professor> => fetchData(Endpoint.PROFESSOR, {
    id: professorId
})
    .then(professor => ({
        id: professor.$id,
        name: professor.name, 
        votes: professor.votes, 
        subjects: professor.subjects
    }))
    .catch(() => ({
        name: "Unknown",
        id: professorId, 
        votes: 0, 
        subjects: []
    }));

export const fetchSubjects = async (professorId: string): Promise<Subject[]> => {
    return await fetchData(Endpoint.SUBJECT, {
        id: professorId
    })
    .then(subjects => subjects as Subject[])
    .catch(() => {
        console.error("Failed to fetch subjects for professor ID:", professorId);
        return [];
    });
}
    
    