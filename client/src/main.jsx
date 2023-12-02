import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Context, ContextProvider } from "./context/Context"; // Mengimpor ContextProvider
import { useContext } from "react";

function App() {
  const { user } = useContext(Context); // Menggunakan useContext di dalam fungsi komponen App
  // console.log(user);
  const router = createBrowserRouter([
    // Definisikan rute berdasarkan kondisi user
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/posts",
      element: <Home />,
    },
    {
      path: "/post/:id",
      element: <Single />,
    },
    // ... (Rute lainnya)
    {
      path: "/write",
      element: user ? <Write /> : <Login />,
    },
    {
      path: "/settings",
      element: user ? <Setting /> : <Login />,
    },
    {
      path: "/login",
      element: user ? <Home /> : <Login />,
    },
    {
      path: "/register",
      element: user ? <Home /> : <Register />,
    },
  ]);

  return (
    <React.StrictMode>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
