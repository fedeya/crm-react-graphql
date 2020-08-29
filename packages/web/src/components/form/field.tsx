import { FormikContextType } from 'formik';

type FieldProps = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  formik: FormikContextType<any>;
};

const Field: React.FC<FieldProps> = ({
  name,
  label,
  formik,
  type,
  placeholder
}) => {
  return (
    <label>
      <span className="block text-gray-700 text-sm font-bold my-2">
        {label}
      </span>
      <input
        className="form-field"
        type={type ?? 'text'}
        placeholder={placeholder}
        value={formik.values[name]}
        id={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </label>
  );
};

export default Field;
