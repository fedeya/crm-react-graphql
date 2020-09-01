import { FormikContextType } from 'formik';

type FormProps = {
  formik: FormikContextType<any>;
};

const Form: React.FC<FormProps> = ({ children, formik }) => {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
    >
      {children}
    </form>
  );
};

export default Form;
