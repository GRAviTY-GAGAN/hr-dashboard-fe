import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Logo1 from "../assests/logo1.png";
import { MdDashboard } from "react-icons/md";
import { MdWorkOff } from "react-icons/md";
import { BsNewspaper } from "react-icons/bs";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MenuFoldOutlined } from "@ant-design/icons";

const Siderbar = ({ handleCloseSidebar, sidebarClose }) => {
  const userObj = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [clickStyle, setClickStyle] = useState(1);

  const handleLocation = (num, pathName) => {
    setClickStyle(num);
    navigate(`/home/${pathName}`);
  };

  useEffect(() => {
    let locationName = location?.pathname.split("/")[2];
    console.log(currentPath);
    switch (locationName) {
      case "dashboard":
        return handleLocation(1, "dashboard");

      case "payroll":
        return handleLocation(2, "payroll");

      case "leave":
        return handleLocation(3, "leave");

      default:
        return handleLocation(1, "dashboard");
    }
  }, []);

  return (
    <>
      <div
        className={`sidebar__mainCont ${
          sidebarClose ? "sidebar__sidebarClose" : "sidebar__sidebarOpen"
        } `}
      >
        <aside className="sidebar__sidebar">
          <div
            style={{
              diplay: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "1.4rem",
                fontWeight: "600",
                // color: "#748DA6",
                color: "#354259",
                cursor: "default",
              }}
            >
              <img
                src={Logo1}
                style={{
                  width: "4rem",
                  marginLeft: "0.8rem",
                  cursor: "default",
                }}
              />
              {"  "} Office HR
            </div>
          </div>

          <div className="sidebarContainer">
            <div onClick={handleCloseSidebar} className="sidebar__hamClose">
              <MenuFoldOutlined />
            </div>
            <ul style={{ marginLeft: "2px", marginTop: "0.8rem" }}>
              <Link to="/home/dashboard">
                <li
                  onClick={() => {
                    setClickStyle(1);
                  }}
                  className={`${clickStyle == 1 ? "item active" : "item "}`}
                >
                  <div className="sidebarText">
                    {" "}
                    <MdDashboard
                      style={{
                        fontSize: "1rem",
                        marginRight: "5px",
                        color: `${clickStyle == 1 ? "white" : "#A4A6B3"}`,
                      }}
                    />{" "}
                    Dashboard{" "}
                  </div>
                </li>
              </Link>

              <Link to="/home/payroll">
                <li
                  onClick={() => {
                    setClickStyle(2);
                  }}
                  className={`${clickStyle == 2 ? "item active" : "item "}`}
                >
                  <div className="sidebarText">
                    {" "}
                    <RiMoneyDollarBoxFill
                      style={{
                        color: "#A4A6B3",
                        fontSize: "1rem",
                        marginRight: "5px",
                        color: `${clickStyle == 2 ? "white" : "#A4A6B3"}`,
                      }}
                    />{" "}
                    Payroll Management{" "}
                  </div>
                </li>
              </Link>
              <Link to="/home/leave">
                <li
                  onClick={() => {
                    setClickStyle(3);
                  }}
                  className={`${clickStyle == 3 ? "item active" : "item "}`}
                >
                  <div className="sidebarText">
                    {" "}
                    <MdWorkOff
                      style={{
                        color: "#A4A6B3",
                        fontSize: "1rem",
                        marginRight: "5px",
                        color: `${clickStyle == 3 ? "white" : "#A4A6B3"}`,
                      }}
                    />{" "}
                    Leave Management{" "}
                  </div>
                </li>
              </Link>
              {userObj.employeeType == 2 ? (
                <div>
                  <Link to="/home/update">
                    <li
                      onClick={() => {
                        setClickStyle(4);
                      }}
                      className={`${clickStyle == 4 ? "item active" : "item "}`}
                    >
                      <div className="sidebarText">
                        {" "}
                        <BsNewspaper
                          style={{
                            color: "#A4A6B3",
                            fontSize: "1rem",
                            marginRight: "5px",
                            color: `${clickStyle == 4 ? "white" : "#A4A6B3"}`,
                          }}
                        />{" "}
                        Daily Updates{" "}
                      </div>
                    </li>
                  </Link>
                </div>
              ) : null}

              {/* <Link to="/home/test">
                <li
                  onClick={() => {
                    setClickStyle(4);
                  }}
                  className={`${clickStyle == 4 ? "item active" : "item "}`}
                >
                  <div className="sidebarText">
                    {" "}
                    <BsNewspaper
                      style={{
                        color: "#A4A6B3",
                        fontSize: "1rem",
                        marginRight: "5px",
                        color: `${clickStyle == 4 ? "white" : "#A4A6B3"}`,
                      }}
                    />{" "}
                    Quarterly Assessment{" "}
                  </div>
                </li>
              </Link> */}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Siderbar;
