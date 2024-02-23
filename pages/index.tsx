import Head from 'next/head'

import Layout from "@/components/Layout";
import HomePage from '@/components/Home/index';

export default function Home() {
  return (
    <>
        <Head>
            <title>Vandy Professor Leaderboard</title>
            <meta name="description" content="Read and write reviews, optimize your course calendar" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
            <HomePage />
        </Layout>
    </>
  )
}
