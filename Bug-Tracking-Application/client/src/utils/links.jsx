import { MdBugReport } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";

const links = [
  {
    text: "Dash Board",
    path: "",
    icon: <AiFillDashboard />,
  },
  {
    text: "My profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    text: "Users",
    path: "users",
    icon: <FaUsers />,
  },
  {
    text: "Reports",
    path: "reports",
    icon: <MdBugReport />,
  },
  {
    text: "Admin",
    path: "admin",
    icon: <MdAdminPanelSettings />,
  },
];

export default links;
