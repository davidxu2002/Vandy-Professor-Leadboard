import Head from 'next/head'

import Layout from "@/components/Layout";
import HomePage from '@/components/Home/index';

export default function Home() {
  return (
    <>
        <Head>
            <title>Vanderbilt Professor Leaderboard</title>
            <meta name="description" content="Vote for your favorite professors!" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
            <HomePage />
        </Layout>
    </>
  )
}
