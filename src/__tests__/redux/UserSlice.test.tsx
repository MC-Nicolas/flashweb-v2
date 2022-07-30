import userReducer, {
  setIsUserAuthenticated,
  setUserEmail,
} from '@/redux/user/UserSlice';

test('Should return initial state ', () => {
  expect(userReducer(undefined, { type: undefined })).toEqual({
    email: '',
    isUserAuthenticated: false,
  });
});

test('Should add user email and isUserAuthenticated to true', () => {
  const previousState: { email: string; isUserAuthenticated: boolean } = {
    email: '',
    isUserAuthenticated: false,
  };

  expect(userReducer(previousState, setUserEmail('example@gmail.com'))).toEqual(
    {
      email: 'example@gmail.com',
      isUserAuthenticated: true,
    }
  );
});

test('Should Log out and set isUserAuthenticated to false', () => {
  const previousState: { email: string; isUserAuthenticated: boolean } = {
    email: 'example@gmail.com',
    isUserAuthenticated: true,
  };
  expect(userReducer(previousState, setIsUserAuthenticated(false))).toEqual({
    email: '',
    isUserAuthenticated: false,
  });
});
