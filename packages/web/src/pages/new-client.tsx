import { useFormik } from 'formik';
import * as yup from 'yup';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';

import urqlConfig from '../config/urql';
import Layout from '../components/layout';
import Field from '../components/form/field';
import FormError from '../components/form/error';
import { useCreateClientMutation } from '../generated/graphql';

const NewClient: React.FC = () => {
  const [{ error }, createClient] = useCreateClientMutation();

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      company: '',
      phone: ''
    },
    validationSchema: yup.object({
      name: yup.string().required('the name is required'),
      lastName: yup.string().required('the last name is required'),
      email: yup
        .string()
        .email('enter a valid email')
        .required('the email is required'),
      phone: yup.string().required('the phone is required'),
      company: yup.string().required('the company is required')
    }),
    async onSubmit(input) {
      const { data } = await createClient({ input });
      if (!data) return;
      await router.push('/');
    }
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800">New Client</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
          >
            <FormError message={error?.graphQLErrors[0].message} />

            <Field
              name="name"
              label="Name"
              placeholder="Name Client"
              formik={formik}
            />

            <FormError formik={formik} name="name" />

            <Field
              name="lastName"
              label="Last Name"
              placeholder="Last Name Client"
              formik={formik}
            />

            <FormError formik={formik} name="lastName" />

            <Field
              name="company"
              label="Company"
              placeholder="Company Client"
              formik={formik}
            />

            <FormError formik={formik} name="company" />

            <Field
              name="email"
              label="Email"
              type="email"
              placeholder="Email Client"
              formik={formik}
            />

            <FormError formik={formik} name="email" />

            <Field
              name="phone"
              label="Phone"
              type="tel"
              placeholder="Phone Client"
              formik={formik}
            />

            <FormError formik={formik} name="phone" />

            <button type="submit" className="form-button">
              Register Client
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default withUrqlClient(urqlConfig, { ssr: true })(NewClient);
