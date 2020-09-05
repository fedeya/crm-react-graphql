import { Formik } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import {
  useClientQuery,
  useUpdateClientMutation,
  useCreateClientMutation
} from '@Generated/graphql';
import Swal from 'sweetalert2';

import { useAuthMutation, useAuthQuery } from '../../hooks/auth';

import Form from '@Atoms/form';
import Error from '@Atoms/error';
import FieldError from '@Molecules/field-error';
import Button from '@Atoms/button';

type ClientFormProps = {
  edit: boolean;
};

const ClientForm: React.FC<ClientFormProps> = ({ edit }) => {
  const router = useRouter();

  const [{ data, fetching }] = useAuthQuery(
    options =>
      useClientQuery({
        ...options,
        variables: { id: router.query.id as string }
      }),
    !edit
  );

  const [{ error: updateError }, updateClient] = useAuthMutation(
    useUpdateClientMutation
  );
  const [{ error: createError }, createClient] = useAuthMutation(
    useCreateClientMutation
  );

  if (fetching) return <p>Loading...</p>;

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
        name: data?.client.name || '',
        company: data?.client.company || '',
        email: data?.client.email || '',
        lastName: data?.client.lastName || '',
        phone: data?.client.phone || ''
      }}
      onSubmit={async input => {
        if (edit) {
          const { data } = await updateClient({
            input,
            id: router.query.id as string
          });
          if (!data) return;
          await router.push('/');
          await Swal.fire(
            'Updated',
            'the client was updated successfully',
            'success'
          );
          return;
        }

        const { data } = await createClient({ input });
        if (!data) return;
        await router.push('/');
      }}
      enableReinitialize
    >
      {props => (
        <Form formik={props}>
          <Error
            message={
              createError?.graphQLErrors[0].message ||
              updateError?.graphQLErrors[0].message
            }
          />
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
          <Button type="submit">{edit ? 'Edit' : 'Add'} Client</Button>
        </Form>
      )}
    </Formik>
  );
};

export default ClientForm;
