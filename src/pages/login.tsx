import React from 'react';
import PageContainer from 'src/components/PageContainer/PageContainer';
import FlexContainer from 'src/components/FlexContainer/FlexContainer';
import LoginForm from '@/components/LoginForm/LoginForm';
import Head from 'next/head';

const LoginPage = () => {
  return (
    <PageContainer>
      <Head>
        <title>Login</title>
      </Head>

      <FlexContainer flexDirection='column'>
        <LoginForm />
      </FlexContainer>
    </PageContainer>
  );
};

export default LoginPage;
