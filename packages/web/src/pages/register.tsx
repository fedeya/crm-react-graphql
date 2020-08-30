import { useFormik } from 'formik';
import { withUrqlClient } from 'next-urql';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

import FormError from '../components/form/error';
import Field from '../components/form/field';
import urqlConfig from '../config/urql';
import { useRegisterMutation } from '../generated/graphql';
import Layout from '../components/layout';

const Register: React.FC = () => {
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
      await axios.post('/api/user', data.register.token);
      await router.push('/');
    }
  });

  return (
    <Layout>
      <h1 className="text-center text-2xl text-white">Register</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
          >
            <FormError message={result.error?.graphQLErrors[0]?.message} />

            <Field
              name="name"
              label="Name"
              placeholder="Name"
              formik={formik}
            />

            <FormError formik={formik} name="name" />

            <Field
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              formik={formik}
            />

            <FormError formik={formik} name="lastName" />

            <Field
              name="email"
              type="email"
              label="Email"
              placeholder="Email"
              formik={formik}
            />

            <FormError formik={formik} name="email" />

            <Field
              name="password"
              type="password"
              label="Password"
              placeholder="*******"
              formik={formik}
            />

            <FormError formik={formik} name="password" />

            <button type="submit" className="form-button">
              Sign Up
            </button>
            <Link href="/login">
              <a className="text-purple my-2 block text-center">
                you already have an account? log in
              </a>
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default withUrqlClient(urqlConfig)(Register);
