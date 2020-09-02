import Link from 'next/link';

type ButtonProps = {
  type?: 'submit' | 'button' | 'reset';
  onClick(e: React.MouseEvent): void;
  disabled?: boolean;
};

type DeleteButtonProps = {
  type?: 'submit' | 'button' | 'reset';
  onClick(e: React.MouseEvent): void;
};

type EditButtonProps = {
  href: string;
  as?: string;
};

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  onClick,
  disabled
}) => (
  <button
    className={`form-button ${disabled && 'opacity-50 cursor-not-allowed'}`}
    type={type ?? 'button'}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => (
  <button
    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
    onClick={onClick}
  >
    Delete
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4 ml-2"
      data-darkreader-inline-fill=""
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      ></path>
    </svg>
  </button>
);

export const EditButton: React.FC<EditButtonProps> = ({ href, as }) => (
  <Link href={href} as={as}>
    <a className="flex justify-center items-center bg-green-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold">
      Edit
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4 ml-2"
        data-darkreader-inline-fill=""
      >
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
      </svg>
    </a>
  </Link>
);

export default Button;
