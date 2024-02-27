import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Loader() {
  const dispatch = useDispatch();

  return <div className="loader"></div>;
}
