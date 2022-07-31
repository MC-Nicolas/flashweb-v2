import RouteGuard from '@/components/RouteGuard/RouteGuard';
import UserData from '@/hooks/UserData/UserData.hook';
import type { AppProps } from 'next/app';

import { Toaster } from 'react-hot-toast';
import ReduxProvider from 'src/redux/Provider';
import store from 'src/redux/store';

import '../styles/global.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ReduxProvider store={store}>
      {/* <RouteGuard> */}

      <Toaster />
      <UserData>
        <Component {...pageProps} />
      </UserData>
      {/* </RouteGuard> */}
    </ReduxProvider>
  );
};

export default MyApp;
