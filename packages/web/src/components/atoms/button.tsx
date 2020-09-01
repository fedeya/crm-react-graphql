type ButtonProps = {
  type?: 'submit' | 'button' | 'reset';
};

const Button: React.FC<ButtonProps> = ({ type, children }) => (
  <button className="form-button" type={type ?? 'button'}>
    {children}
  </button>
);

export default Button;
