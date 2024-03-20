import Head from 'next/head'

import Layout from "@/components/Layout";
import ProfessorsPage from "@/components/Professors";

export default function ProfessorPage() {
    return (
        <>
            <Head>
                <title>Vandy Professor Leaderboard - Professors</title>
                <meta name="description" content="Read and write reviews, optimize your course calendar" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout
                authGate
            >
                <ProfessorsPage />
            </Layout>
        </>
    )
}