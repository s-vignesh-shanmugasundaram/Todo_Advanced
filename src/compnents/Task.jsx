import { Link } from "react-router-dom";
import DeletePopup from "./popups/DeletePopup";
import { useRef } from "react";
import TaskPopup from "./popups/TaskPopup";
import { updateData } from "./Store/taskAction";

export default function Task({
  title,
  description,
  date,
  id,
  status,
  label,
  style,
}) {
  const deleteRef = useRef();
  const viewOneItem = useRef();
  const modal = document.getElementById("modal");
  const viewOne = document.getElementById("viewOneModal");
  const deleteTask = () => {
    modal.classList.remove("show");
    deleteRef.current.showModal();
  };

  const viewOneTask = () => {
    viewOne.classList.remove("show");
    viewOneItem.current.showModal();
    // document.addEventListener("keydown", function (event) {
    //   if (event.key === "Escape") {
    //     console.log("hi");
    //     viewOne.classList.add("show");
    //   }
    // });
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
  return (
    <>
      <div className="task ">
        <div className="taskIcon">
          <img className="taskIconImg" src="/icons/task.png" alt="task icon" />
        </div>

        <div className="taskContent" onClick={viewOneTask}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="funtions">
          <select
            name="status"
            id="status1"
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
              Completed&nbsp;
            </option>
            <option value="" disabled>
              &nbsp;
            </option>
          </select>
          <div className="taskDate">
            <img
              className="taskDateImg"
              src="/icons/clock.png"
              alt="clock icon"
            />
            <span className="taskDateText">{date}</span>
          </div>
          <Link to={`/editTask/${id}`}>
            <button className="editButton">
              <img src="/icons/edit 1.png" alt="edit icon" />
            </button>
          </Link>

          <button className="deleteButton" onClick={deleteTask}>
            <img
              className="delete"
              src="./icons/delete 1.png"
              alt="delete icon"
            />
          </button>
        </div>

        {label === "Label"
          ? ""
          : style && (
              <div className="taskLabel">
                <img className="labelIcon" src="./Label.png" alt="labelIcon " />
                {label}
              </div>
            )}
      </div>
      <DeletePopup refe={deleteRef} id={id} title={title} />
      <TaskPopup
        refe={viewOneItem}
        id={id}
        title={title}
        description={description}
        date={date}
        status={status}
        label={label}
      />
    </>
  );
}
