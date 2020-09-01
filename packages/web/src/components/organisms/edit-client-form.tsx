import { Formik } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useClientQuery, useUpdateClientMutation } from '@Generated/graphql';
import Swal from 'sweetalert2';

import Form from '@Atoms/form';
import Error from '@Atoms/error';
import FieldError from '@Molecules/field-error';
import Button from '@Atoms/button';

const EditClientForm: React.FC = () => {
  const router = useRouter();

  const [{ data, fetching }] = useClientQuery({
    variables: { id: router.query.id as string }
  });

  const [{ error }, updateClient] = useUpdateClientMutation();

  if (fetching) return <p>Loading...</p>;

  const { company, email, lastName, name, phone } = data!.client;

  return (
    <Formik
      validationSchema={() =>
        yup.object({
          name: yup.string().required('the name is required'),
          lastName: yup.string().required('the last name is required'),
          email: yup
            .string()
            .email('enter a valid email')
            .required('the email is required'),
          phone: yup.string().required('the phone is required'),
          company: yup.string().required('the company is required')
        })
      }
      initialValues={{
        name,
        company,
        email,
        lastName,
        phone
      }}
      onSubmit={async input => {
        const { data, error } = await updateClient({
          input,
          id: router.query.id as string
        });
        console.log(error);
        if (!data) return;
        await router.push('/');
        Swal.fire('Updated', 'the client was updated successfully', 'success');
      }}
      enableReinitialize
    >
      {props => (
        <Form formik={props}>
          <Error message={error?.graphQLErrors[0].message} />

          <FieldError name="name" formik={props} />

          <FieldError
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
            formik={props}
          />

          <FieldError name="company" formik={props} />

          <FieldError name="email" type="email" formik={props} />

          <FieldError name="phone" type="tel" formik={props} />

          <Button type="submit">Edit Client</Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditClientForm;
