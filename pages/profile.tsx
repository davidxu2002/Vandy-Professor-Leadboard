import Head from 'next/head'

import Layout from "@/components/Layout";
import Profile from "@/components/Profile";

export default function ProfilePage() {
    return (
        <>
            <Head>
                <title>Vandy Courses - Profile</title>
                <meta name="description" content="Read and write reviews, optimize your course calendar" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout
                authGate
            >
                <Profile />
            </Layout>
        </>
    )
}