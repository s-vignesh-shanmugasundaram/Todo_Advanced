import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faBook } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getData, updateData } from "./Store/taskAction";
import { useEffect, useState } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./popups/Loader";

export default function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const singleTask = await getData(id);
      setTask(singleTask);
    };
    fetchData();
  }, []);
  // onChange function
  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  //Date function
  function dateFormate(dates) {
    const date = dates.split("T")[0];
    return date;
  }

  // fetch to update backend
  const updateHandler = (e) => {
    e.preventDefault();
    toast.success(" Data Successfully Updated..!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
    setTimeout(() => {
      navigate("/");
    }, 3000);
    updateData(task);
  };

  const cancleHandler = () => {
    navigate("/");
  };
  return (
    <>
      {task._id ? (
        <div className="hole-division">
          <img className="edit-image" src="/edit.png" alt="image" />
          <p className="para">EDIT TASK</p>
          <form onSubmit={updateHandler} className="form1">
            <ToastContainer />
            <div className="input-icons">
              <p className="p1">Title</p>
              <div className="title">
                <FontAwesomeIcon icon={faEdit} id="edit" />

                <input
                  type="text"
                  className="input"
                  placeholder="Title"
                  name="title"
                  value={task.title}
                  onChange={onChange}
                  required
                />
              </div>
              <p className="p2">Description</p>
              <div className="text-area">
                <FontAwesomeIcon icon={faBook} id="edit-edit" />

                <textarea
                  // type="text"
                  className="input-area"
                  name="description"
                  placeholder="Description"
                  value={task.description}
                  onChange={onChange}
                  required
                />
              </div>
              <p className="p3">Due Date</p>
              <div className="title">
                <input
                  className="input-field"
                  type="date"
                  name="due_date"
                  defaultValue={dateFormate(task.due_date)}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <br />

            <button type="submit" className="save-btn">
              Save
            </button>

            <Link to="/">
              <button className="cancel-btn" onClick={cancleHandler}>
                cancel
              </button>
            </Link>
          </form>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
