import ButtonWithIcon from '@/components/Buttons/ButtonWithIcon';
import InsetNeumorphicContainer from '@/components/Containers/InsetNeumorphicContainer/InsetNeumorphicContainer';
import PageContainerWithNav from '@/components/Containers/PageContainerWithNav/PageContainerWithNav';
import FlexContainer from '@/components/FlexContainer/FlexContainer';
import SectionTitle from '@/components/Texts/SectionTitle';
import { auth } from '@/database/firebase';
import { useAppDispatch, useAppSelector } from '@/redux/redux.hooks';
import { setIsUserAuthenticated } from '@/redux/user/UserSlice';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';

const SettingsPage = () => {
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
      <FlexContainer height='85vh' flexDirection='column'>
        <h3 style={{ color: 'white' }}>Email: {email}</h3>
        <ButtonWithIcon
          title='Log out'
          iconIsComponent
          iconPosition='right'
          icon={<LogoutIcon />}
          onClick={handleSignOut}
        />
      </FlexContainer>
    </PageContainerWithNav>
  );
};

export default SettingsPage;
