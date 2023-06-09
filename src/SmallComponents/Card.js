import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import { Modal, Input, notification } from "antd";
import { BsArrowLeftRight } from "react-icons/bs";
import { CommentOutlined } from "@ant-design/icons";

import "./Card.css";
import "antd/dist/antd.css";

const { TextArea } = Input;

function Card({ Obj, fetchReq }) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [rejectedModalVisible, setRejectedModalVisible] = useState(false);
  const [rejectionMessage, setRejectionMessage] = useState("");

  const showModal = () => {
    setVisible(true);
  };

  const url =
    process.env.NODE_ENV == "development"
      ? process.env.REACT_APP_LOCAL_URL
      : process.env.REACT_APP_PROD_URL;

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
      rejectedModalVisible == true && setRejectedModalVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    rejectedModalVisible == true
      ? setRejectedModalVisible(false)
      : setVisible(false);
  };

  const showRejectedModal = () => {
    setRejectedModalVisible(true);
  };

  const handleRejectionMesssage = (text) => {
    text = "" + text.trim();
    setRejectionMessage(text);
  };

  const rejectRequest = async () => {
    if (rejectionMessage.length < 60) {
      return alert(
        "Please enter reason of rejection in detail (message should have 60+ letters)"
      );
    }

    setTimeout(() => {
      setRejectedModalVisible(false);
    }, 200);

    try {
      let response = await axios({
        method: "post",
        // url: `https://hr-dashboard-nimish.herokuapp.com/admin/leave/${Obj.leaveId}`,
        url: `${url}/admin/leave/${Obj.leaveId}`,
        data: { reasonOfRejection: rejectionMessage },
      });

      if (response.status == 200) showNotification("Rejection");
    } catch (error) {
      console.log(error);
    }
  };

  const fillDummyData = async () => {
    setRejectionMessage(
      "Sorry! Because of work load we can't grant you leave for this time, but as soon as the work load is reduced we promise to grant you leave, Thank You!"
    );
  };

  const approveRequest = async () => {
    try {
      let response = await axios({
        method: "post",
        // url: `https://hr-dashboard-nimish.herokuapp.com/admin/leave/approve/${Obj.leaveId}`,
        url: `${url}/admin/leave/approve/${Obj.leaveId}`,
        data: { isApproved: true },
      });

      // console.log(response.status == 200);
      if (response.status == 200) showNotification("Approve");
      fetchReq();
    } catch (error) {
      console.log(error);
    }
  };

  const showNotification = async (result) => {
    notification["success"]({
      message: "Leave Request",
      description: `Your Action of ${result} is completed from Backend 👍 `,
      icon: (
        <CommentOutlined
          style={{
            color: "#108ee9",
          }}
        />
      ),
    });
  };

  return (
    <>
      {Obj.isApproved == false && Obj.isRejected == false && (
        <div className="cardmainstyle">
          <div className="card">
            <div className="card__cardSubCont" onClick={showModal}>
              <div id="name" className="name">
                <div className="namestyle">
                  <div>{Obj.employeName} </div>
                  {/* <div className="smalltext" style={{marginLeft: "1rem", fontSize:"1.2rem", fontWeight:"400"}} > { "( " + moment(Obj.dateOfLeave).format('MMMM Do YYYY, h:mm:ss a') + " )"} </div> */}
                  <div id="dateFromAndTo" className="smalltext">
                    <span
                      className="spantg"
                      style={{ color: "#7bd4fb" }}
                    ></span>
                    {moment(Obj.dateOfLeave).format("MMMM Do YYYY")}

                    <BsArrowLeftRight
                      style={{
                        color: "#6075fe",
                        // color: "#7bd4fb",
                        fontWeight: "600",
                        fontSize: "1.4rem",
                      }}
                    />

                    {moment(Obj.endOfLeave).format("MMMM Do YYYY")}
                    <span
                      className="spantg"
                      style={{ color: "#7bd4fb" }}
                    ></span>
                  </div>
                </div>

                <div className="smalltext">
                  {" "}
                  {Obj.designation + ", " + Obj.deparatment}{" "}
                </div>
              </div>
              <div className="smalltext ">
                {Obj.reasonOfLeave.length > 40
                  ? "Subject : " +
                    Obj.reasonOfLeave.substring(0, 40) +
                    " ...showmore"
                  : "Subject : " + Obj.reasonOfLeave}
              </div>
              <div className="smalltext">
                {" "}
                Leaves Taken this Month : {Obj.leavesTakenInMonth} and Remaining
                Leaves : {Obj.remainingLeaves}
              </div>
            </div>

            <div className="btncontainer">
              <div className="btn approve" onClick={approveRequest}>
                <div className="btntext"> Approve </div>
              </div>
              <div className="btn reject" onClick={showRejectedModal}>
                <div className="btntext"> Reject </div>
              </div>
            </div>
          </div>

          <Modal
            visible={visible}
            title="Request For Leaves"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <div className="btncontainermodal">
                <div className="btnmodal approve" onClick={approveRequest}>
                  <div className="btntext"> Approve </div>
                </div>
                <div className="btnmodal reject" onClick={showRejectedModal}>
                  <div className="btntext"> Reject </div>
                </div>
              </div>,
            ]}
          >
            <div style={{ color: "rgb(53, 66, 89)" }}>
              <div className="name">
                <span className="spantg"> {Obj.employeName} </span>
                <div className="smalltext">
                  {" "}
                  {Obj.designation + ", " + Obj.deparatment}{" "}
                </div>
              </div>
              <div className="smalltext ">
                Subject : <span className="spantg">{Obj?.reasonOfLeave}</span>
              </div>
              <div className="smalltext">
                {" "}
                Leaves Taken this Month :{" "}
                <span className="spantg">{Obj.leavesTakenInMonth}</span>
              </div>
              <div className="smalltext">
                Remaining Leaves :{" "}
                <span className="spantg"> {Obj.remainingLeaves}</span>
              </div>
              <div className="smalltext">
                Date of Leave :
                <span className="spantg">
                  {" " + moment(Obj.dateOfLeave).format("MMMM Do YYYY")}
                </span>
              </div>

              <div className="smalltext">
                End of Leave :
                <span className="spantg">
                  {" " + moment(Obj?.endOfLeave).format("MMMM Do YYYY")}
                </span>
              </div>

              <div className="smalltext">
                Number of days :
                <span className="spantg">
                  {" " + Obj?.noofDaysLeaveRequired}
                </span>
              </div>
            </div>
          </Modal>

          <Modal
            visible={rejectedModalVisible}
            title="Mention reason of rejection "
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <div className="btncontainermodal">
                <div className="btnmodal approve" onClick={handleCancel}>
                  <div className="btntext"> Back </div>
                </div>
                <div className="btnmodal approve" onClick={fillDummyData}>
                  <div className="btntext"> Dummy Data </div>
                </div>
                <div className="btnmodal reject" onClick={rejectRequest}>
                  <div className="btntext"> Reject </div>
                </div>
              </div>,
            ]}
          >
            <TextArea
              rows={5}
              placeholder="Please write down the reason for leave "
              maxLength={300}
              onChange={(e) => handleRejectionMesssage(e.target.value)}
              minLength={60}
              value={rejectionMessage}
            />
          </Modal>
        </div>
      )}
    </>
  );
}

export default Card;
