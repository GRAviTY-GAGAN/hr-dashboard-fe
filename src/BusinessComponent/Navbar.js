import React, { useEffect, useState, useRef } from "react";
import { BsBorder } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { RiAdminLine, RiAdminFill } from "react-icons/ri";
import { IoPersonOutline, IoPersonSharp } from "react-icons/io5";
import { Avatar } from "antd";
import "./Navbar.css";

const Navbar = ({ handleCloseSidebar, sidebarClose }) => {
  // const [title, setTitle] = useState('Dashboard');
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const userObj = useSelector((state) => state.reducer);
  const dispatch = useDispatch();

  let location = useLocation();
  let title;

  switch (location?.pathname) {
    case "/home/dashboard":
      title = "Dashboard";
      break;

    case "/home/payroll":
      title = "Payroll";
      break;

    case "/home/leave":
      title = "Leave";
      break;

    case "/home/issue":
      title = "Issues";
      break;

    case "/home/update":
      title = "Daily Updates";
      break;

    case "/home/test":
      title = "Quaterly Assessment";
      break;

    default:
      title = "Dashboard";
      break;
  }

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 4000);
  };

  const handleLogout = () => {
    dispatch({
      type: "login",
      payload: "logout",
    });

    navigate("/");
  };

  const handleProfile = () => {
    navigate("/home/payroll");
  };

  return (
    <nav className="navbar__navbar">
      <div onClick={handleCloseSidebar} className="navbar__hamOpen">
        <MenuUnfoldOutlined />
      </div>
      <div className="navbar__location">{title}</div>
      <div className="navbar__UserInfo">
        <div className="navbar__UserName" style={{ marginRight: "8px" }}>
          {userObj?.firstName}
        </div>
        <div onClick={handleClick}>
          <Avatar
            size={34}
            icon={
              userObj.employeeType == 1 ? <RiAdminFill /> : <IoPersonSharp />
            }
            // icon={<IoPersonSharp />}
            style={{
              color: "#6075fe",
              cursor: "pointer",
              backgroundColor: "#e6e6e6",
            }}
          />
          {clicked == true ? (
            <div className="avatardropctn">
              <div className="avataroptionsctn">
                <div className="options" onClick={handleProfile}>
                  {" "}
                  Profile{" "}
                </div>
                <div className="options" onClick={handleLogout}>
                  {" "}
                  Logout{" "}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
