import React, { useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AiTwotoneDelete, AiOutlineDelete } from "react-icons/ai";
import "./EmployeeUpdatesCard.css";
import { useSelector } from "react-redux";

function EmployeeUpdatesCard({ data, fn, setUpdateArr, updateArr }) {
  const userObj = useSelector((state) => state.reducer);

  const url =
    process.env.NODE_ENV == "development"
      ? process.env.REACT_APP_LOCAL_URL
      : process.env.REACT_APP_PROD_URL;

  const handleDelete = async () => {
    let responseObj = await axios({
      method: "delete",
      // url: `https://hr-dashboard-nimish.herokuapp.com/employee/deletetask/${data.taskId}`,
      url: `${url}/employee/deletetask/${data.taskId}`,
      data: { empId: userObj.id },
    });

    let datax = updateArr.filter((item) => {
      if (item.taskId != data.taskId) {
        return item;
      }
    });
    setUpdateArr(datax);
    // console.log(datax);
  };

  return (
    <>
      {data.taskId ? (
        <div className="maincardctn">
          {/* <small className="smalltxt"> {data.taskId} </small> */}
          <div className="cardflex">
            <div className="headingtxt"> {data.taskHeading} </div>
            <small className="smalltxt">
              {/* {moment(data.taskCompletedDate).format("MMM Do YYYY")}{" "} */}
              {data.taskCompletedDate.split(" ").join("/")}{" "}
            </small>
          </div>
          <div className="EmployeeUpdateCard__Desc">
            <small className="smalltxt"> Description : </small>{" "}
            {data.taskDescription.length > 80
              ? data.taskDescription.substring(0, 80) + " ..."
              : data.taskDescription}{" "}
          </div>
          <div style={{ textAlign: "right" }}>
            {" "}
            <span>
              {" "}
              <AiOutlineDelete
                onClick={() => handleDelete()}
                className="deleteicon"
                size={22}
              />{" "}
            </span>{" "}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default EmployeeUpdatesCard;
