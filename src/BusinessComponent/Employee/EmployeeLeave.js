import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import EmployeePreviousLeave from "../../SmallComponents/EmployeePreviousLeave";
import RaiseIssueModal from "../../SmallComponents/RaiseIssueModal";

import { Input, DatePicker, Modal, notification } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { VscWorkspaceUntrusted } from "react-icons/vsc";
import "antd/dist/antd.min.css";
import "./EmployeeLeave.css";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function EmployeeLeave() {
  const obj = {
    employeName: "",
    employeId: "",
    designation: "",
    deparatment: "",
    remainingLeaves: "",
    leavesTakenInMonth: Number,
    isApproved: false,
    isRejected: false,
    reasonOfLeave: "",
    noofDaysLeaveRequired: "",
    dateOfLeave: "",
    endOfLeave: "",
    isPending: true,
    reasonOfRejection: "",
    leaveId: "",
  };
  //
  const url =
    process.env.NODE_ENV == "development"
      ? process.env.REACT_APP_LOCAL_URL
      : process.env.REACT_APP_PROD_URL;

  const [leaveObj, setLeaveObj] = useState(obj);
  const [responseObj, setResponseObj] = useState({});
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [raiseIssueModal, setRaiseIssueModal] = useState(false);

  const userObj = useSelector((state) => state.reducer);
  // console.log("consoling userObj", userObj);
  const dispatch = useDispatch();

  const updateUserDetails = async () => {
    // let updatedDetails = await axios.get(
    //   `https://hr-dashboard-nimish.herokuapp.com/employee/details/${userObj.id}`
    // );
    let updatedDetails = await axios.get(
      `${url}/employee/details/${userObj.id}`
    );
    dispatch({
      type: "login",
      payload: updatedDetails.data[0],
    });
  };

  useEffect(() => {
    updateUserDetails();
  }, [responseObj]);

  const applyCliked = () => {
    showModal();
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 200);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCalendarChange = (start, end) => {
    let uniqueLeaveId = uuidv4();
    // setLeaveObj({ ...leaveObj, leaveId: uniqueLeaveId });
    setLeaveObj((leaveObj) => ({
      ...leaveObj,
      dateOfLeave: moment(start[0]?._d).format("DD MMM YYYY"),
      endOfLeave: moment(start[1]?._d).format("DD MMM YYYY"),
      leaveId: uniqueLeaveId,
    }));
    // setLeaveObj((leaveObj) => ({
    //   ...leaveObj,
    //   endOfLeave: moment(start[1]?._d).format("DD MMM YYYY"),
    // }));

    let StartDate = moment(start[0]?._d);
    let EndDate = moment(start[1]?._d);

    //Difference
    const date1 = new Date(StartDate);
    const date2 = new Date(EndDate);
    const ans = date2.getTime() - date1.getTime();
    const diffDays = ans / (1000 * 60 * 60 * 24);

    const startDate = moment(start[0]?._d).format("D MMM YYYY");
    const endDate = moment(start[1]?._d).format("D MMM YYYY");

    setLeaveObj((leaveObj) => ({
      ...leaveObj,
      noofDaysLeaveRequired: diffDays,
    }));
  };

  const handleReasoneOfLeave = (text) => {
    setLeaveObj((prevObj) => ({ ...prevObj, reasonOfLeave: text }));
    setLeaveObj((prevObj) => ({
      ...prevObj,
      employeName: userObj.firstName + " " + userObj.lastName,
    }));
    setLeaveObj((prevObj) => ({
      ...prevObj,
      designation: userObj.designation,
    }));
    setLeaveObj((prevObj) => ({
      ...prevObj,
      deparatment: userObj.deparatment,
    }));
    setLeaveObj((prevObj) => ({ ...prevObj, employeId: userObj.id }));
    setLeaveObj((prevObj) => ({
      ...prevObj,
      leavesTakenInMonth: userObj.leavesTakenInMonth,
    }));
    setLeaveObj((prevObj) => ({ ...prevObj, isPending: true }));
    setLeaveObj((prevObj) => ({
      ...prevObj,
      remainingLeaves: userObj.paidLeavesRemaining,
    }));
  };

  const openNotification = (placement) => {
    notification.open({
      message: "Leave Sent to Admin",
      description: `Your leave request of ${leaveObj.noofDaysLeaveRequired} days from ${leaveObj.dateOfLeave} to ${leaveObj.endOfLeave} is send to admin. Please wait until Admin Respond's`,
      placement: "bottomLeft",
      icon: (
        <CheckCircleOutlined
          style={{
            color: "#6075fe",
          }}
        />
      ),
    });
  };

  const handleApplyLeave = async () => {
    // console.log(leaveObj, "from handle Leave Fn");

    try {
      // console.log(leaveObj.leaveId, "after clicking on the apply leave");
      if (
        leaveObj.reasonOfLeave != "" &&
        leaveObj.dateOfLeave != "" &&
        leaveObj.endOfLeave != "" &&
        leaveObj.noofDaysLeaveRequired != "" &&
        leaveObj.leaveId != ""
      ) {
        let response = await axios({
          method: "post",
          // url: "https://hr-dashboard-nimish.herokuapp.com/admin/leave",
          url: `${url}/admin/leave`,
          data: leaveObj,
        });

        // console.log(response.status === 200, "response from backend");

        response.status === 200 && openNotification("bottomLeft");
        setResponseObj(response.data);
      } else {
        alert("problem");
        // console.log(leaveObj);
      }
    } catch (error) {
      console.log(error.message);
    }

    setTimeout(() => {
      setVisible(false);
    }, 50);
  };

  return (
    <div>
      <div className="employeeLeave__emplevMainCont">
        <div className="employeeLeave__emplev">
          <div className="employeeLeave__levdate">
            <RangePicker
              bordered={false}
              format="YYYY-MM-DD"
              onCalendarChange={(start, end) =>
                handleCalendarChange(start, end)
              }
            />
            <div className="applybtn" onClick={applyCliked}>
              {" "}
              Apply{" "}
            </div>
          </div>

          <div className="employeeLeave__infotxt">
            <div
              className="employeeLeave__raiseIssueBtn"
              onClick={() => setRaiseIssueModal(true)}
            >
              <span>
                {" "}
                <VscWorkspaceUntrusted
                  style={{
                    paddingTop: "7px",
                    fontSize: "20px",
                    fontWeight: "800",
                  }}
                />{" "}
              </span>
              Raise Issue{" "}
            </div>

            <div className="employeeLeave__count">
              <div>
                Remaining Leaves -{" "}
                <span className="hightxt"> {userObj.paidLeavesRemaining} </span>{" "}
              </div>
              <div>
                Leaves Taken This Month -{" "}
                <span className="hightxt"> {userObj.leavesTakenInMonth} </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RaiseIssueModal
        raiseIssueModal={raiseIssueModal}
        setRaiseIssueModal={setRaiseIssueModal}
      />

      <Modal
        visible={visible}
        title="Leave Details"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="btncontainermodal">
            <div className="btnmodal approve">
              <div
                className="btntext"
                style={{ fontSize: "1rem" }}
                // onClick={() => handleApplyLeave()}
                onClick={() =>
                  handleReasoneOfLeave(
                    "Due to work lately I feel exhausted and want to relax for a sometime, I hope you grant me leave"
                  )
                }
              >
                {" "}
                Dummy Data{" "}
              </div>
            </div>

            <div className="btnmodal approve">
              <div
                className="btntext"
                style={{ fontSize: "1rem" }}
                onClick={() => handleApplyLeave()}
              >
                {" "}
                Apply Leave{" "}
              </div>
            </div>
          </div>,
        ]}
      >
        <div className="modaltxt">
          {" "}
          Requesting Leave From{" "}
          <span className="hightxt">
            {leaveObj.dateOfLeave === ""
              ? "( Please select a date )"
              : leaveObj.dateOfLeave}
          </span>{" "}
          for{" "}
          <span className="hightxt">
            {" "}
            {leaveObj.noofDaysLeaveRequired === ""
              ? "( Please select a start and end date ) "
              : leaveObj.noofDaysLeaveRequired}
            {" days"}
          </span>{" "}
          that will be till{" "}
          <span className="hightxt">
            {" "}
            {leaveObj.endOfLeave === ""
              ? "( Please select a date )"
              : leaveObj.endOfLeave}{" "}
          </span>
        </div>
        <div
          style={{
            fontSize: "0.8rem",
            marginBottom: "0.8rem",
            fontWeight: "600",
          }}
        >
          {" "}
          Reason of Leave{" "}
        </div>
        <TextArea
          rows={5}
          placeholder="Please write down the reason for leave "
          maxLength={300}
          onChange={(e) => handleReasoneOfLeave(e.target.value)}
          minLength={60}
          value={leaveObj.reasonOfLeave}
        />
      </Modal>

      <div className="previousLeaveEMp">
        <EmployeePreviousLeave pendingObj={responseObj} />
      </div>
    </div>
  );
}

export default EmployeeLeave;
