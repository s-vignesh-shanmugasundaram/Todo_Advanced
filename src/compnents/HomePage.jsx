import { useEffect, useState } from "react";
import AllTasks from "./AllTasks";
import StartUpWindow from "./StartUpWindow";
import Loader from "./popups/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "./Store/taskAction";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const { task, loading } = useSelector((state) => state.tasks);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      dispatch(getAllData());
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  } else if (task) {
    if (task.length > 0) {
      return <AllTasks tasks={task} />;
    } else {
      return <StartUpWindow />;
    }
  }
}
