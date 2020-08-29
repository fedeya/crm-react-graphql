import { withUrqlClient } from 'next-urql';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';

import urqlConfig from '../config/urql';
import FormError from '../components/form/error';
import Field from '../components/form/field';
import { useLoginMutation } from '../generated/graphql';

const Login: React.FC = () => {
  const [result, login] = useLoginMutation();

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
      const result = await login({
        input: values
      });
      console.log(result);
    }
  });

  return (
    <>
      <h1 className="text-center text-2xl text-white">Login</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
          >
            <FormError message={result.error?.graphQLErrors[0]?.message} />

            <Field
              name="email"
              type="email"
              placeholder="Email"
              label="Email"
              formik={formik}
            />

            <FormError formik={formik} name="email" />

            <Field
              name="password"
              type="password"
              placeholder="******"
              label="Password"
              formik={formik}
            />

            <FormError formik={formik} name="password" />

            <button className="form-button" type="submit">
              Log In
            </button>
            <Link href="/register">
              <a className="text-indigo text-center my-2 block">
                you don't have an account? sign up
              </a>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default withUrqlClient(urqlConfig)(Login);
