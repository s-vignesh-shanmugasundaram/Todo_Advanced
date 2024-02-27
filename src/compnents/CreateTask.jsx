import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faBook } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTask } from "./Store/taskAction";

export default function CreateTask() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.success("Successfully Add New Task", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
    setTimeout(() => {
      navigate("/");
    }, 3000);
    const FD = new FormData(event.target);
    const data = Object.fromEntries(FD.entries());
    await createTask(data);
  };

  return (
    <div className="hole-division">
      <ToastContainer />
      <img className="image" src="./01 Man Sending Emails.png" alt="image" />
      <p className="para">CREATE NEW TASK</p>
      <form onSubmit={handleSubmit} className="form1">
        <div className="input-icons">
          <p className="p1">Title</p>
          <div className="title">
            <FontAwesomeIcon icon={faEdit} id="edit" />

            <input
              type="text"
              className="input"
              placeholder="Title"
              name="title"
              required
            />
          </div>
          <p className="p2">Description</p>
          <div className="title">
            <FontAwesomeIcon icon={faBook} id="edit" />

            <input
              type="text"
              className="input"
              name="description"
              placeholder="Description"
              required
            />
          </div>
          <p className="p3">Due Date</p>
          <div className="title">
            <input
              className="input-field"
              type="date"
              name="due_date"
              required
            />
          </div>
        </div>

        <br />
        <br />
        <button type="submit" className="add-task-btn">
          Add Task
        </button>
      </form>
    </div>
  );
}
