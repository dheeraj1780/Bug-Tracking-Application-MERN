import { useDashboardContext } from "../pages/Dashboard";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  const { toggleSidebar, data } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = data.user;
        if (path === "admin" && role !== "admin") return;
        if (path === "users" && role !== "admin" && role !== "incharge") return;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
