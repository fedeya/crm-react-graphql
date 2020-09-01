import Link from 'next/link';
import { useRouter } from 'next/router';

type NavLinkProps = {
  href: string;
};

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const router = useRouter();

  return (
    <li className={router.pathname === href ? 'bg-indigo-800 p-2' : 'p-2'}>
      <Link href={href}>
        <a className="text-white block">{children}</a>
      </Link>
    </li>
  );
};

export default NavLink;
