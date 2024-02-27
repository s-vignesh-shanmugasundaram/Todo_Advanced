import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import DeletePopup from "./DeletePopup";
import { useNavigate } from "react-router-dom";
import { getAllData, updateData } from "../Store/taskAction";
import Lable from "./Label";

export default function TaskPopup({
  title,
  description,
  date,
  id,
  refe,
  status,
  label,
}) {
  const viewOne = document.getElementById("viewOneModal");
  const modal = document.getElementById("modal");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteRef = useRef();
  const viewLable = useRef();
  const [labelValue, setLableValue] = useState(label);

  const deleteTask = () => {
    modal.classList.remove("show");
    console.log(deleteRef);
    deleteRef.current.showModal();
  };

  const cancelHandler = (refe) => {
    dispatch(getAllData());
    refe.current.close();
    viewOne.classList.add("show");
  };

  const editHandle = (id) => {
    viewOne.classList.add("show");
    navigate(`/editTask/${id}`);
  };

  const handleStatus = (e) => {
    e.target.className = "";
    const status = e.target.value;
    const className =
      (status === "open" && "grey") ||
      (status === "completed" && "green") ||
      (status === "inprogress" && "blue");

    e.target.classList.add(className);
    updateData({
      _id: id,
      taskStatus: e.target.value,
    });
  };
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleOpenLable = () => {
    viewLable.current.showModal();
  };
  function handleKeyPress(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      if (viewLable.current) viewLable.current.close();
    }
  }

  // Adding event listener for key press
  document.addEventListener("keydown", handleKeyPress);
  return createPortal(
    <dialog className="task-popup" ref={refe}>
      <div className="popup-nav">
        <img src="./Vector.png" alt="" />
        <h2>{title}</h2>
        <select
          name="status"
          id="status"
          className={
            (status === "open" && "grey") ||
            (status === "completed" && "green") ||
            (status === "inprogress" && "blue")
          }
          onChange={handleStatus}
        >
          <option value="open" hidden>
            {capitalizeFirstLetter(status)}
          </option>
          <option value="" disabled>
            &nbsp;
          </option>
          <option value="inprogress" className="status-option">
            Inprogress
          </option>
          <option value="" disabled>
            &nbsp;
          </option>
          <option value="completed" className="status-option">
            Completed
          </option>
          <option value="" disabled>
            &nbsp;
          </option>
        </select>
        <button onClick={() => cancelHandler(refe)}>
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <hr />
      <div className="popup-content">
        <div className="popup-content-left">{description}</div>
        <div className="popup-content-right">
          <p>Due Date</p>
          <p className="btn-date">
            <img src="./Vector (1).png" alt="" />
            <span>{date}</span>
          </p>
          <hr className="hr" />
          <div onClick={handleOpenLable}>
            <button className="edit-btn-popup">
              <img src="./label1.png" className="imgs2" alt="" />
            </button>
            <span className="span1">{labelValue}</span>
          </div>
          <hr className="hr" />

          <div onClick={() => editHandle(id)}>
            <button className="edit-btn-popup">
              <img src="./edit 1.png" className="imgs2" alt="" />
            </button>
            <span className="span1">Edit task</span>
          </div>

          <hr className="hr" />
          <div onClick={deleteTask}>
            <button className="deleteButton">
              <img
                className="delete"
                src="./icons/delete 1.png"
                alt="delete icon"
              />
            </button>
            <span className="span1">Delete task</span>
          </div>

          <hr className="hr" />
        </div>
      </div>
      <DeletePopup refe={deleteRef} id={id} title={title} />
      <Lable
        refe={viewLable}
        id={id}
        labelChange={setLableValue}
        label={labelValue}
      />
    </dialog>,
    document.getElementById("viewOneModal")
  );
}
