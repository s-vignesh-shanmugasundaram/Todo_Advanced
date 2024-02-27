import { Link } from "react-router-dom";

export default function StartUpwindow() {
  return (
    <div className="hole-div">
      <img
        src="./01 Man Sending Emails.png"
        className="img"
        alt="StartUpWindow"
      />
      <h2>WOOHOO, YOU'RE ALL DONE!</h2>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <Link to="/addTask">
        <button>
          <img src="./Group 7.png" alt="" /> CREATE NEW TASK
        </button>
      </Link>
    </div>
  );
}
