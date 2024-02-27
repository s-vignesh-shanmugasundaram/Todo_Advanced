import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faClose } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import { deleteData, getAllData } from "../Store/taskAction";

export default function DeletePopup({ refe, id, title }) {
  const dispatch = useDispatch();
  const viewOne = document.getElementById("viewOneModal");

  const deleteHandler = async (data, deleteRef) => {
    ///delete Data from database
    await deleteData(data);

    // again fetch All data from database and store in redux
    dispatch(getAllData());

    deleteRef.current.close();
    modal.classList.add("show");
    viewOne.classList.add("show");
  };

  const cancelHandler = (refe) => {
    refe.current.close();
    modal.classList.add("show");
  };
  return createPortal(
    <dialog className="layout" ref={refe} onClose={() => cancelHandler(refe)}>
      <FontAwesomeIcon icon={faInfoCircle} />
      <FontAwesomeIcon
        icon={faClose}
        id="close-icon"
        onClick={() => cancelHandler(refe)}
      />

      <p className="msg">
        Are you sure you want to delete <br />
        <b>{title}</b>
        <br />
        <br />
        <button
          className="cancel-btn-del btn-del"
          onClick={() => cancelHandler(refe)}
        >
          cancel
        </button>
        <button
          className="delete-btn-del btn-del"
          onClick={() => deleteHandler(id, refe)}
        >
          delete
        </button>
      </p>
    </dialog>,
    document.getElementById("modal")
  );
}
