import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useAppSelector } from 'src/redux/redux.hooks';

import { publicPaths } from './publicPaths';
import PageContainer from '../PageContainer/PageContainer';

type Props = {};

const RouteGuard = ({ children }: { children: any }) => {
  const router = useRouter();
  const { isUserAuthenticated } = useAppSelector((state) => state.user);
  const [authorized, setAuthorized] = useState(false);

  const authCheck = (url: string) => {
    const path = url.split('?')[0];

    if (!isUserAuthenticated && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath },
      });
    } else if (isUserAuthenticated && publicPaths.includes(path)) {
      setAuthorized(true);
      router.push('/dashboard');
    } else {
      setAuthorized(true);
    }
  };
  useEffect(() => {
    authCheck(router.asPath);

    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return authorized && <PageContainer>{children}</PageContainer>;
};

export default RouteGuard;
