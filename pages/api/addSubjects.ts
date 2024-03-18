import { fetchSubjects } from '@/services/coursesApi/fetch';

import { setSubject } from '@/services/subjects';

import type { NextApiRequest, NextApiResponse } from 'next'

export type AddSubjectsResponse = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AddSubjectsResponse>
) {
    const page = req.query.page as string;
    const subjects = await fetchSubjects(parseInt(page));
    await Promise.all(subjects.map(subject => setSubject(subject)));
    res.status(200).json({ message: 'Success' });
}