import NavLink from '@Atoms/navlink';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-indigo-900 w-1/3 xl:w-1/5 min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-bold">CRM Clients</p>
      </div>

      <nav className="mt-5 list-none">
        <ul>
          <NavLink href="/">Clients</NavLink>
          <NavLink href="/orders">Orders</NavLink>
          <NavLink href="/products">Products</NavLink>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
