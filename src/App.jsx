
import React from "react";
import ReactDOM from "react-dom/client";
import  Header  from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Error from "./components/Error";
import Restaurant_Menu from "./components/Restaurant_Menu";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
  

const App_Layout = () => {
  return (
    <Provider store={appStore}>
      <div className="app">
        <Header />
      
        <Outlet/>
      </div>
    </Provider>
  );
};


const app_router = createBrowserRouter([
  {
    path: "/",
    element: <App_Layout/>,
    errorElement: <Error/>,
    children: [
      {
        // if my path is "/" then i want the Body component child to be rendered
        path: "/",
        element: <Body/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/restaurant/:res_id",
        element: <Restaurant_Menu/>
      },
      {
        path: "/cart",
        element: <Cart/>
      }
      

    ]
  },
  {
    path: "/about",
    element: <About/>
  },
  {
    path: "/contact",
    element: <Contact/>
  }
  
])


const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(<App_Layout />);

// So instead of using the above, we use:

root.render(<RouterProvider router = {app_router} />)
