import {fetchAllProfessors} from '@/services/coursesApi/fetch';

import {setProfessor} from "@/services/professors";

import type { NextApiRequest, NextApiResponse } from 'next'

export type AddProfessorsResponse = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AddProfessorsResponse>
) {
    const page = req.query.page as string;
    const professors = await fetchAllProfessors("1000", parseInt(page));
    await Promise.all(professors.map(professor => setProfessor(professor)));
    res.status(200).json({ message: 'Success' });
}