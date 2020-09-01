import { useFormik } from 'formik';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import { useLoginMutation } from '@Generated/graphql';

import Error from '@Atoms/error';
import Button from '@Atoms/button';
import Form from '@Atoms/form';
import FieldError from '@Molecules/field-error';

const LoginForm: React.FC = () => {
  const [result, login] = useLoginMutation();

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('enter a valid email')
        .required('the email is required'),
      password: yup
        .string()
        .required('the password is required')
        .min(6, 'the password must be 6 characters')
    }),
    async onSubmit(values) {
      const { data } = await login({
        input: values
      });
      if (!data) return;

      localStorage.setItem('token', data.login.token);
      await axios.post('/api/user', { token: data.login.token });
      await router.push('/');
    }
  });

  return (
    <Form formik={formik}>
      <Error message={result.error?.graphQLErrors[0]?.message} />
      <FieldError formik={formik} type="email" name="email" />
      <FieldError
        formik={formik}
        type="password"
        name="password"
        placeholder="******"
      />
      <Button type="submit">Log In</Button>
      <Link href="/register">
        <a className="text-indigo text-center my-2 block">
          you don't have an account? sign up
        </a>
      </Link>
    </Form>
  );
};

export default LoginForm;
