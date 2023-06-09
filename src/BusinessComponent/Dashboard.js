import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Chat from "./Chat";
import EmployeeDashboard from "./Employee/EmployeeDashboard";
import DashboardTableOne from "../SmallComponents/DashboardTableOne";

import { TiTick } from "react-icons/ti";
import { motion } from "framer-motion";
import "./Dashboard.css";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const userObj = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [returnToLoginPage, setReturnToLoginPage] = useState(false);

  const url =
    process.env.NODE_ENV == "development"
      ? process.env.REACT_APP_LOCAL_URL
      : process.env.REACT_APP_PROD_URL;

  //_____this two functions only have the functionality no UI_______________________________________________________________

  async function updatePerformance(num1, num2, num3, num4, performanceMessage) {
    if (performanceMessage.trim() != "") {
      alert("Performance Message cant be blank");
      return;
    }
    let totalscore = num1 + num2 + num3 + num4;
    let responseObj = await axios.post({
      method: "post",
      // url: `https://hr-dashboard-nimish.herokuapp.com/admin/performance/${userObj.id}`,
      url: `${url}/admin/performance/${userObj.id}`,
      data: {
        performanceMessage: performanceMessage,
        performanceScore: totalscore,
      },
    });

    responseObj.status == 200 &&
      notification.open({
        message: "User Performance is updated",
        icon: <TiTick style={{ fontSize: "1.5rem", color: "#4BB543" }} />,
      });

    dispatch({
      type: "login",
      payload: responseObj.data,
    });
  }

  async function updateShift(shift) {
    let responseObj = await axios({
      method: "post",
      // url: `https://hr-dashboard-nimish.herokuapp.com/admin/shift/${userObj.id}`,
      url: `${url}/admin/performance/${userObj.id}`,
      data: {
        shift: shift,
      },
    });

    dispatch({
      type: "login",
      payload: responseObj.data,
    });
  }

  // _______________________________________________________________________

  // console.log("comming from use selector", userObj);

  const [clickStyle, setClickStyle] = useState(0);

  const [small, setSmall] = useState(false);
  const [employeeType, setEmp] = useState();

  useEffect(() => {
    setEmp(userObj.employeeType);
    // console.log(userObj);
  }, []);

  return (
    <div>
      {userObj == "logout" && navigate("/")}
      {userObj.employeeType == 1 ? (
        <div>
          <div className="dashItems">
            <div
              className={` ${clickStyle === 1 ? "activeSection" : ""} ${
                small ? " sections" : " section"
              } `}
              onClick={() => {
                setClickStyle(1);
                setSmall(true);
              }}
            >
              <motion.div whileHover={{ scale: 1.2 }}>Engineering</motion.div>
            </div>
            <div
              className={` ${clickStyle === 2 ? "activeSection" : ""} ${
                small ? " sections" : " section"
              }`}
              onClick={() => {
                setClickStyle(2);
                setSmall(true);
              }}
            >
              <motion.div whileHover={{ scale: 1.2 }}>Operations</motion.div>
            </div>
            <div
              className={` ${clickStyle === 3 ? "activeSection" : ""} ${
                small ? " sections" : " section"
              } `}
              onClick={() => {
                setClickStyle(3);
                setSmall(true);
              }}
            >
              <motion.div whileHover={{ scale: 1.2 }}>Accounts</motion.div>
            </div>
            <div
              className={` ${clickStyle === 4 ? "activeSection" : ""} ${
                small ? " sections" : " section"
              } `}
              onClick={() => {
                setClickStyle(4);
                setSmall(true);
              }}
            >
              <motion.div whileHover={{ scale: 1.2 }}>Supply Chain</motion.div>
            </div>
            {clickStyle != 0 && <DashboardTableOne clickedBtn={clickStyle} />}
          </div>
        </div>
      ) : (
        <div>{userObj.employeeType == 2 && <EmployeeDashboard />}</div>
      )}
    </div>
  );
}

export default Dashboard;
