import PageContainerWithNav from '@/components/Containers/PageContainerWithNav/PageContainerWithNav';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import SectionTitle from '@/components/Texts/SectionTitle';
import { auth } from '@/database/firebase';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { setIsUserAuthenticated } from '@/redux/user/UserSlice';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

const SettingsPage = (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.user);

  const handleSignOut = async () => {
    await signOut(auth);
    await dispatch(setIsUserAuthenticated(false));
    router.push('/');
  };
  return (
    <PageContainerWithNav pageTitle='GLP - Settings'>
      <FlexContainer height='100px'>
        <SectionTitle title='Settings' color='white' />
      </FlexContainer>
      <FlexContainer height='85vh'>
        <h3>{email}</h3>
        <button onClick={handleSignOut}>Log out</button>
      </FlexContainer>
    </PageContainerWithNav>
  );
};

export default SettingsPage;
