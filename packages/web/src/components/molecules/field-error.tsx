import { FormikContextType } from 'formik';

import Field from '@Atoms/field';
import Error from '@Atoms/error';

type FieldErrorProps = {
  formik: FormikContextType<any>;
  name: string;
  label?: string;
  type?: 'email' | 'tel' | 'number' | 'text' | 'password';
  placeholder?: string;
};

const FieldError: React.FC<FieldErrorProps> = ({
  formik,
  name,
  type = 'text',
  placeholder,
  label
}) => {
  const nameCapitalize = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <>
      <Field
        name={name}
        type={type}
        placeholder={placeholder ?? nameCapitalize}
        label={label ?? nameCapitalize}
        formik={formik}
      />
      <Error formik={formik} name={name} />
    </>
  );
};

export default FieldError;
