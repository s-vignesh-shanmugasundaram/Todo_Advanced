import "@fontsource/poppins";
import CreateTask from "./compnents/CreateTask";
import EditTask from "./compnents/EditTask";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./compnents/Main";
import Homepage from "./compnents/HomePage";
import AllTasks from "./compnents/AllTasks";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/overView",
        element: <AllTasks />,
      },
      {
        path: "/addTask",
        element: <CreateTask />,
      },
      {
        path: "/editTask/:id",
        element: <EditTask />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
