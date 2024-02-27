import { useRef, useState } from "react";
import { updateData } from "../Store/taskAction";
import { useDispatch } from "react-redux";
import { addTask } from "../Store/tasksSlice";

export default function Label({ refe, id, labelChange, label }) {
  const dispatch = useDispatch();
  const labelRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = labelRef.current.value;
    if (!data) {
      data = "Label";
    }
    dispatch(addTask.labelChange(data));

    updateData({
      _id: id,
      label: data,
    });
    labelChange(data);
    refe.current.close();
  };

  return (
    <dialog className="label" ref={refe}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a label"
          ref={labelRef}
          defaultValue={label}
        />
        <button>Create</button>
      </form>
    </dialog>
  );
}
