import { addTask } from "./tasksSlice";

export const getAllData = () => async (dispatch) => {
  try {
    dispatch(addTask.loader());
    dispatch(addTask.labelClear());

    const response = await fetch("http://127.0.0.1:3000/api/tasks");
    const { data } = await response.json();
    dispatch(addTask.addTask(data));
  } catch (err) {
    console.log(err);
  }
};

export const createTask = async (data) => {
  try {
    await fetch("http://127.0.0.1:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
  }
};
export const getData = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/tasks/${id}`);
    const { data } = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateData = async (data) => {
  try {
    await fetch(`http://127.0.0.1:3000/api/tasks/${data._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteData = async (data) => {
  try {
    await fetch(`http://127.0.0.1:3000/api/tasks/${data}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
};

// const objdata = useSelector((e) => e.tasks.keywords);
export const queryTasks = (objdata) => async (dispatch) => {
  try {
    const params = new URLSearchParams(objdata);
    const tasks = await fetch(`http://127.0.0.1:3000/api/tasks?${params}`);
    const { data } = await tasks.json();
    if (data.length === 0) {
      dispatch(addTask.messageChange(true));
    } else {
      dispatch(addTask.addTask(data));
      dispatch(addTask.messageChange(false));
    }
  } catch (err) {
    console.log(err);
  }
};
