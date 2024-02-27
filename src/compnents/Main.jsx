import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Main() {
  return (
    <div className="main1">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
