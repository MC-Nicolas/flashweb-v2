import toast from 'react-hot-toast';

export const funcWithError = async (func: any[], args: any[][]) => {
  try {
    for (let i = 0; i < func.length; i++) {
      await func[i](...args[i]);
    }
    toast.success('Success');
  } catch (e) {
    toast.error('Oops! Something went wrong.');
  }
};
