import { Formik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import {
  useUpdateProductMutation,
  useProductQuery,
  useCreateProductMutation
} from '@Generated/graphql';
import Form from '@Atoms/form';
import Error from '@Atoms/error';
import Button from '@Atoms/button';
import { useAuthQuery, useAuthMutation } from '../../hooks/auth';
import FieldError from '@Molecules/field-error';

type ProductFormProps = {
  edit: boolean;
};

const ProductForm: React.FC<ProductFormProps> = ({ edit }) => {
  const router = useRouter();
  const [{ data, fetching }] = useAuthQuery(
    options =>
      useProductQuery({
        ...options,
        variables: { id: router.query.id as string }
      }),
    !edit
  );
  const [{ error: updateError }, editProduct] = useAuthMutation(
    useUpdateProductMutation
  );
  const [{ error: createError }, createProduct] = useAuthMutation(
    useCreateProductMutation
  );

  if (fetching) return <p>Loading...</p>;

  return (
    <Formik
      validationSchema={() =>
        yup.object({
          name: yup.string().required('the name is required'),
          price: yup.number().required('the price is required'),
          quantity: yup.number().required('the quantity is required')
        })
      }
      initialValues={{
        name: data?.product.name || '',
        price: data?.product.price || 0,
        quantity: data?.product.quantity || 0
      }}
      onSubmit={async input => {
        if (edit) {
          const { data } = await editProduct({
            id: router.query.id as string,
            input
          });
          if (!data) return;
          await router.push('/products');
          await Swal.fire(
            'Updated',
            'the product was updated successfully',
            'success'
          );
          return;
        }

        const { data } = await createProduct({ input });
        if (!data) return;
        await router.push('/products');
      }}
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
          <FieldError name="quantity" type="number" formik={props} />
          <FieldError name="price" type="number" formik={props} />
          <Button type="submit">{edit ? 'Edit' : 'Create'} Product</Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
