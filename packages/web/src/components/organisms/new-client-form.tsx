import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useCreateClientMutation } from '@Generated/graphql';

import Form from '@Atoms/form';
import Error from '@Atoms/error';
import FieldError from '@Molecules/field-error';
import Button from '@Atoms/button';

const NewClientForm: React.FC = () => {
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
    <Form formik={formik}>
      <Error message={error?.graphQLErrors[0].message} />
      <FieldError name="name" formik={formik} />
      <FieldError
        name="lastName"
        label="Last Name"
        placeholder="Last Name"
        formik={formik}
      />
      <FieldError name="company" formik={formik} />
      <FieldError name="email" type="email" formik={formik} />
      <FieldError name="phone" type="tel" formik={formik} />
      <Button type="submit">Register Client</Button>
    </Form>
  );
};

export default NewClientForm;
