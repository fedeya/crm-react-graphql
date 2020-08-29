import { useFormik } from 'formik';
import FormError from '../components/form/error';
import Field from '../components/form/field';
import * as yup from 'yup';

const Register: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      name: yup.string().required('The Name is Required'),
      lastName: yup.string().required('The Last Name is Required'),
      email: yup
        .string()
        .email('Enter a Valid Email')
        .required('The Email is Required'),
      password: yup
        .string()
        .required('The Password is Required')
        .min(6, 'The password must be 6 characters')
    }),
    onSubmit(values) {
      console.log(values);
    }
  });

  return (
    <div className="bg-indigo-900 min-h-screen flex flex-col justify-center">
      <h1 className="text-center text-2xl text-white">Register</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
          >
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
