import { Link } from "react-router-dom";
import Task from "./Task";
import { queryTasks } from "./Store/taskAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListSquares,
  faMagnifyingGlass,
  faThLarge,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./Store/tasksSlice";
import { useEffect, useRef, useState } from "react";

export default function AllTasks({ tasks }) {
  const dispatch = useDispatch();
  const { style, message, status, label, labelFilter, keyword } = useSelector(
    (el) => el.tasks
  );
  const [bool, setBool] = useState(keyword);

  useEffect(() => {
    dispatch(queryTasks(keyword));
  }, [bool]);

  const filterOpen = useRef();
  const filterCompleted = useRef();
  const filterInprogress = useRef();

  const dateFormat = (date) => {
    return date.split("-").reverse().join("-");
  };

  const handleViewList = () => {
    if (!style) dispatch(addTask.styleChange());
  };
  const handleViewGrid = () => {
    if (style) dispatch(addTask.styleChange());
  };
  const searchHandler = (e) => {
    dispatch(addTask.addQuery({ title: e.target.value }));
    setBool({
      ...bool,
      title: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(addTask.addQuery({ taskStatus: status.toString() }));
    setBool({
      ...bool,
      taskStatus: status.toString(),
    });

    tasks.map((el) => {
      dispatch(addTask.labelChange(el.label));
    });
  }, [status]);

  useEffect(() => {
    dispatch(addTask.addQuery({ label: labelFilter.toString() }));
    setBool({
      ...bool,
      label: labelFilter.toString(),
    });
  }, [labelFilter]);

  const handleChangeForm = async (e) => {
    dispatch(addTask.statusChange(e.target.value));
  };

  const handleFilter = (data) => {
    if (data === "open") {
      filterOpen.current.checked = false;
    } else if (data === "completed") {
      filterCompleted.current.checked = false;
    } else if (data === "inprogress") {
      filterInprogress.current.checked = false;
    }
    dispatch(addTask.statusChange(data));
  };

  const handleAllClearFilter = () => {
    dispatch(addTask.statusChange("clear"));
    filterCompleted.current.checked = false;
    filterInprogress.current.checked = false;
    filterOpen.current.checked = false;
  };

  const handleLabelChange = (e) => {
    dispatch(addTask.labelFilterChange(e.target.value));
  };

  return (
    <main className="allTasks">
      <div className="view-setting">
        <h1>🔥Task</h1>

        <div className="view-card">
          <h2>view</h2>
          <div className="views">
            <div
              className={`view-list ${style && "active"} `}
              onClick={handleViewList}
            >
              <FontAwesomeIcon icon={faListSquares} className="view-icons" />
              <p className="view-name  list-name">list</p>
            </div>
            <div
              className={` view-grid  ${!style && "active"} `}
              id="view-grid"
              onClick={handleViewGrid}
            >
              <FontAwesomeIcon icon={faThLarge} className="view-icons" />
              <p className="view-name">Board</p>
            </div>
          </div>
          {status.length > 0 && (
            <div className="select-filters">
              <h2>Selected Filters({status.length})</h2>
              <button onClick={handleAllClearFilter}>Clear all</button>
              {status.map((el) => (
                <p key={el}>
                  <FontAwesomeIcon
                    icon={faClose}
                    onClick={() => handleFilter(el)}
                  />
                  &nbsp;{el}
                </p>
              ))}
            </div>
          )}
          <div className="view-task-status">
            <h2>Task status</h2>
            <form onChange={handleChangeForm}>
              <input
                type="checkbox"
                id="Open"
                name="Open"
                value="open"
                ref={filterOpen}
                defaultChecked={status.includes("open") && true}
              />
              <label htmlFor="Open">Open</label>
              <br />

              <input
                type="checkbox"
                id="InProgress"
                name="InProgress"
                value="inprogress"
                ref={filterInprogress}
                defaultChecked={status.includes("inprogress") && true}
              />
              <label htmlFor="InProgress">In progress</label>
              <br />

              <input
                type="checkbox"
                id="Completed"
                name="Completed"
                value="completed"
                ref={filterCompleted}
                defaultChecked={status.includes("completed") && true}
              />
              <label htmlFor="Completed">Completed</label>
              <br />
            </form>
          </div>

          <div className="view-task-status">
            <h2>Lable</h2>
            {label.length > 0 &&
              label.map((el) => (
                <form key={el}>
                  <input
                    type="checkbox"
                    id={el}
                    name={el}
                    value={el}
                    onClick={handleLabelChange}
                  />
                  <label htmlFor={el}>{el}</label>
                  <br />
                </form>
              ))}
          </div>
        </div>
      </div>

      {/* //===================================================== */}

      <div className="view-tasks">
        <div className="taskHeading">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search anything..."
              className="search-box"
              onChange={(e) => searchHandler(e)}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          </div>
          <Link to="/addTask">
            <button className="addTask">
              <img src="/icons/file.png" alt="file icon" />
              <span>Add New Task</span>
            </button>
          </Link>{" "}
        </div>
        {message ? (
          <p>No data Found</p>
        ) : (
          <div className={` addGrid ${!style && "grid-view"}`}>
            {tasks.map((task) => (
              <Task
                key={task._id}
                title={task.title}
                description={task.description}
                date={dateFormat(
                  task.due_date ? task.due_date.split("T")[0] : ""
                )}
                id={task._id}
                status={task.taskStatus}
                label={task.label}
                style={style}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
