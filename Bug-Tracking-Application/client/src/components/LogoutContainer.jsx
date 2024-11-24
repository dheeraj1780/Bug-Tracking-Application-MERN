import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { useState } from "react";

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);

  const logoutUser = async () => {};
  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        <FaUserCircle />
        <FaCaretDown />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn">
          logout
        </button>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;
