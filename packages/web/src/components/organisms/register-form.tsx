import { useFormik } from 'formik';
import { useRegisterMutation } from '@Generated/graphql';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import * as yup from 'yup';

import Form from '@Atoms/form';
import Error from '@Atoms/error';
import Button from '@Atoms/button';
import FieldError from '@Molecules/field-error';

const RegisterForm: React.FC = () => {
  const [result, register] = useRegisterMutation();

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      name: yup.string().required('the name is required'),
      lastName: yup.string().required('the last name is required'),
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
      const { data } = await register({
        input: values
      });
      if (!data) return;

      localStorage.setItem('token', data.register.token);
      await router.push('/');
    }
  });

  return (
    <Form formik={formik}>
      <Error message={result.error?.graphQLErrors[0]?.message} />

      <FieldError name="name" formik={formik} />

      <FieldError
        name="lastName"
        label="Last Name"
        placeholder="Last Name"
        formik={formik}
      />

      <FieldError name="email" type="email" formik={formik} />

      <FieldError
        name="password"
        type="password"
        placeholder="*******"
        formik={formik}
      />

      <Button type="submit">Sign Up</Button>

      <Link href="/login">
        <a className="text-purple my-2 block text-center">
          you already have an account? log in
        </a>
      </Link>
    </Form>
  );
};

export default RegisterForm;
