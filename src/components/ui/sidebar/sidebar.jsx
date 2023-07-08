import { forwardRef } from "react";
import { NavItem } from "../shared";
import { useUser } from "../../../store";

const Sidebar = forwardRef(({ showNav }, ref) => {
  const { role } = useUser();
  const links = [
    {
      path: "/dashboard",
      title: "Dashboard",
      roles: ["ADMIN", "SUPER_ADMIN"],
    },
    {
      path: "/sales",
      title: "Ventas",
      roles: ["SELLER", "ADMIN", "SUPER_ADMIN"],
    },
    {
      path: "/products",
      title: "Productos",
      roles: ["ADMIN", "SUPER_ADMIN"],
    },
    {
      path: "/users",
      title: "Usuarios",
      roles: ["SUPER_ADMIN"],
    },
  ];

  return (
    <aside ref={ref} className="fixed w-56 h-full bg-slate-900 shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <h1 className="text-2xl font-bold text-white">Logo</h1>
      </div>
      <div className="flex flex-col">
        {links.map(
          (item) =>
            item.roles.includes(role) && (
              <NavItem key={item.path} path={item.path} title={item.title} />
            )
        )}
      </div>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
