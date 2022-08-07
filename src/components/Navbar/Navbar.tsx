import React from 'react';
import NeumorphicButtonWithIcon from '../Buttons/Neumorphics/NeumorphicButtonWithIcon';

import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import SchoolIcon from '@mui/icons-material/School';

import EqualizerIcon from '@mui/icons-material/Equalizer';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import HomeIcon from '@mui/icons-material/Home';

import FlexContainer from '../FlexContainer/FlexContainer';
import NeumorphicSquaredButton from '../Buttons/Neumorphics/NeumorphicSquaredButton';

import styles from './Navbar.module.scss';
import { useRouter } from 'next/router';
import CollapsableMenu from './CollapsableMenu/CollapsableMenu';

type Props = {};

const Navbar = (props: Props) => {
  const { pathname } = useRouter();

  return (
    <div className={styles.navbar}>
      <FlexContainer height='10%'>
        <CollapsableMenu
          icon={<NeumorphicButtonWithIcon icon={<AddIcon />} />}
        />
      </FlexContainer>

      <FlexContainer height='50%'>
        <NeumorphicSquaredButton
          active={pathname === '/dashboard'}
          icon={<HomeIcon />}
          isLink
          pushTo='/dashboard'
        />
        <NeumorphicSquaredButton
          active={pathname === '/study'}
          icon={<SchoolIcon />}
          isLink
          pushTo='/study'
        />
        <NeumorphicSquaredButton
          active={pathname === '/studies'}
          icon={<ViewCarouselIcon />}
          isLink
          pushTo='/studies'
        />
        <NeumorphicSquaredButton
          active={pathname === '/settings'}
          icon={<SettingsIcon />}
          isLink
          pushTo='/settings'
        />
      </FlexContainer>
    </div>
  );
};

export default Navbar;
