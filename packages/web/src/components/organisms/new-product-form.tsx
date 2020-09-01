import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';

import { useCreateProductMutation } from '@Generated/graphql';
import Form from '@Atoms/form';
import Error from '@Atoms/error';
import Button from '@Atoms/button';
import FieldError from '@Molecules/field-error';

const NewProductForm: React.FC = () => {
  const [{ error }, createProduct] = useCreateProductMutation();

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      price: 0,
      quantity: 0
    },
    validationSchema: yup.object({
      name: yup.string().required('the name is required'),
      price: yup.number().required('the price is required'),
      quantity: yup.number().required('the quantity is required')
    }),
    async onSubmit(input) {
      const { data } = await createProduct({ input });
      if (!data) return;
      await router.push('/products');
    }
  });

  return (
    <Form formik={formik}>
      <Error message={error?.graphQLErrors[0].message} />
      <FieldError name="name" formik={formik} />
      <FieldError name="quantity" type="number" formik={formik} />
      <FieldError name="price" type="number" formik={formik} />
      <Button type="submit">Create Product</Button>
    </Form>
  );
};

export default NewProductForm;
