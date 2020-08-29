import { FormikContextType } from 'formik';

type FormErrorProps = {
  name: string;
  formik: FormikContextType<any>;
};

const FormError: React.FC<FormErrorProps> = ({ formik, name }) => {
  if (formik.errors[name] && formik.touched[name])
    return (
      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <p>{formik.errors[name]}</p>
      </div>
    );

  return null;
};

export default FormError;
