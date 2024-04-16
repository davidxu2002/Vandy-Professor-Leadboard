import Head from 'next/head'

import Layout from "@/components/Layout";
import VotePage from '@/components/VotePage/index';



export default function Vote() {
  return (
    <>
        <Head>
            <title>Daily Vote</title>
            <meta name="description" content="Cast a vote for your favorite professors" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
            <VotePage
              
            ></VotePage>
        </Layout>
    </>
  )
}
