import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, provider } from './firebase';

export const loginOrSignup = async (
  isLogin: boolean,
  email: string,
  password: string
) => {
  try {
    if (isLogin) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res;
    } else {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return res;
    }
  } catch (err: any) {
    return { error: err.message };
  }
};

export const googleHandler = async () => {
  let loginResult: any = { error: null, email: null };
  provider.setCustomParameters({ prompt: 'select_account' });
  await signInWithPopup(auth, provider)
    .then((result) => {
      loginResult.email = result.user.email;
    })
    .catch((error) => {
      loginResult.error = error.message;
    });
  return { ...loginResult };
};
