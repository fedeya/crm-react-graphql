import NavLink from '@Atoms/navlink';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-indigo-900 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-bold">CRM Clients</p>
      </div>

      <nav className="mt-5 list-none">
        <ul>
          <NavLink href="/">Clients</NavLink>
          <NavLink href="/orders">Orders</NavLink>
          <NavLink href="/products">Products</NavLink>
        </ul>
        <p className="my-3 text-white font-bold text-xl">Other Options</p>
        <ul>
          <NavLink href="/best-clients">Best Clients</NavLink>
          <NavLink href="/best-sellers">Best Sellers</NavLink>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
