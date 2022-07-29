import React, { useState } from 'react';

import styles from './LoginForm.module.scss';

import FlexContainer from '../FlexContainer/FlexContainer';
import toast from 'react-hot-toast';
import BasicInput from '../Inputs/BasicInput';
import SubmitForm from '../Buttons/SubmitForm';

type Props = {};

const LoginForm = (props: Props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  return (
    <FlexContainer>
      <form
        className={styles.loginForm}
        onSubmit={() => console.log('submitted')}
      >
        <FlexContainer flexDirection='column'>
          <BasicInput
            label='Email'
            placeholder='example@gmail.com'
            value={formData.email}
            onChange={(e: any) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <BasicInput
            label='Password'
            type='password'
            placeholder='**********'
            value={formData.password}
            onChange={(e: any) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <SubmitForm />
        </FlexContainer>
      </form>
    </FlexContainer>
  );
};

export default LoginForm;
