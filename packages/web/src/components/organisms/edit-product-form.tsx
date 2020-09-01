import { Formik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import { useUpdateProductMutation, useProductQuery } from '@Generated/graphql';
import Form from '@Atoms/form';
import Error from '@Atoms/error';
import Button from '@Atoms/button';
import FieldError from '@Molecules/field-error';

const EditProductForm: React.FC = () => {
  const router = useRouter();
  const [{ data, fetching }] = useProductQuery({
    variables: { id: router.query.id as string }
  });
  const [{ error }, editProduct] = useUpdateProductMutation();

  if (fetching) return <p>Loading...</p>;

  const { name, price, quantity } = data!.product;

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
        name,
        price,
        quantity
      }}
      onSubmit={async input => {
        const { data, error } = await editProduct({
          id: router.query.id as string,
          input
        });
        console.log(error);
        if (!data) return;
        await router.push('/products');
        await Swal.fire(
          'Updated',
          'the product was updated successfully',
          'success'
        );
      }}
    >
      {props => (
        <Form formik={props}>
          <Error message={error?.graphQLErrors[0].message} />
          <FieldError name="name" formik={props} />
          <FieldError name="quantity" type="number" formik={props} />
          <FieldError name="price" type="number" formik={props} />
          <Button type="submit">Create Product</Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditProductForm;
