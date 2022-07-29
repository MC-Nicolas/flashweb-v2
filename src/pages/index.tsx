import { useRouter } from 'next/router';

import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '@/styles/Home.module.scss';

import HomeButtonWithText from '@/components/Buttons/HomeButtonWithText';

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>GLP</title>
        <meta name='description' content='Global Learning Platform' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to GLA !</h1>
        <p className={styles.description}>
          The one platform to learn everything you need.
        </p>
        <HomeButtonWithText
          title='Login'
          onClick={() => router.push('/login')}
        />
      </main>
    </div>
  );
};

export default Home;
