import React, { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import BasicTable from "./components/BasicTable";
import AddPost from "./components/AddPost";
import UpdatePost from "./components/UpdatePost";
import SignupForm from "./components/SignupForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const [data, setData] = useState([]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <BasicTable data={data} setData={setData} />,
        },
        {
          path: "/signupForm",
          element: <SignupForm />,
        },
        {
          path: "/addPost",
          element: <AddPost data={data} setData={setData} />,
        },
        {
          path: "/updatePost",
          element: <UpdatePost data={data} setData={setData} />,
        },
      ],
    },
  ]);
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
