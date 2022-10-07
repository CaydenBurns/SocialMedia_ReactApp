import React, { useEffect, useState } from "react";

import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import serviceFunctions from "./services/UserService";
import { Route, Routes } from "react-router-dom";
import SiteNav from "./components/SiteNav";
// import Register from "./components/user/Register";
// import Cars from "../src/components/codeChallenge/Cars";
// import TestAndAjax from "./components/TestAndAjax";
import Footer from "./components/Footer";
// import Home from "./components/Home";
// import Friends from "./components/friends/Friends";
// import Jobs from "./components/jobs/Jobs";
// import Events from "./components/events/Events";
// import Companies from "./components/techCompany/Companies";
// import Login from "./components/user/Login";
// import AddFriend from "./components/friends/AddFriend";
// import AddJob from "./components/jobs/AddJob";
// import ModalJobs from "./components/jobs/ModalJobs";
// import Product from "./components/codeChallenge/Product";
// import AddTechCompany from "./components/techCompany/AddTechCompany";
// import Filtering from "./Filtering";
import routes from "./services/RoutesServies";

function App() {
  const [user, setUser] = useState({
    firstName: "cayden",
    lastName: "Burns",
    isConfirmed: false,
    avatarUrl: "",
    roles: ["Admin"],
  });
  //nothing is going back to the app function , i am just invoking the function somewhere else to return the function invoked with the params you now want to update

  const setUserWrap = (userData) => {
    console.log(userData);

    setUser((pState) => {
      let newLoggedUser = { ...pState };

      newLoggedUser.firstName = userData.firstName;
      newLoggedUser.lastName = userData.lastName;
      newLoggedUser.isConfirmed = userData.isConfirmed;
      newLoggedUser.avatarUrl = userData.avatarUrl;

      return newLoggedUser;
    });
  };

  useEffect(() => {
    serviceFunctions
      .getUser()
      .then(onGetCurrentUserSuccess)
      .catch(onGetCurrentUserError);
  }, []);
  const onGetCurrentUserSuccess = (response) => {
    console.log(
      "Get current User Succes in the user current success handler",
      response
    );
    serviceFunctions
      .getCurrentUserById(response.id)
      .then(getCurrentUserByIdSuccess)
      .catch(getCurrentUserByIdError);
  };

  const onGetCurrentUserError = (error) => {
    console.warn("getcurrentUser error", error);
  };

  const getCurrentUserByIdSuccess = (response) => {
    console.log("getuserbyID success in teh success handler", response);

    setUserWrap(response);
  };

  const getCurrentUserByIdError = (error) => {
    console.log("getuserbyID success in teh ERROR handler", error);
  };

  const mapPublishedRoutes = (routes) => {
    console.log("ROUTES AT THE TOP OF THE FUNCTION", routes);
    return routes.map((route) => {
      const RouteVar = route.component;
      const routePath = route.path;
      const role = route.roles[0];
      const key = Math.random(10000) * 10;
      console.log("ROLES", role);
      console.log("route.component", RouteVar);
      console.log("PATH", routePath);
      return {
        path: routePath,
        exact: true,
        roles: role,
        component: RouteVar,
        key: key,
      };
    });
  };

  // useEffect(() => {
  //   let routers = mapPublishedRoutes(routes);
  //   return routers;
  // }, []);

  return (
    <React.Fragment>
      <SiteNav user={user}></SiteNav>
      <Routes>
        <Route link={mapPublishedRoutes(routes)} />
      </Routes>

      {/* 

      <Routes>
        <Route path="Product" element={<Product />}></Route>
        <Route
          path="Home"
          element={<Home user={user} setUserFunction={setUserWrap} />} //this allows user to be accessed inside of the child component home
        ></Route>

        <Route path="Filtering" element={<Filtering />} />

        <Route path="AddJob/*" element={<AddJob />}>
          <Route path=":JobId" element={<Jobs />}></Route>
        </Route>
        <Route path="Jobs" element={<Jobs />}></Route>
        <Route path="ModalJobs" element={<ModalJobs />}></Route>

        <Route path="AddTechCompany/*" element={<AddTechCompany />}>
          <Route path=":TechCompanyId" element={<Companies />}></Route>
        </Route>
        <Route path="Companies" element={<Companies />}></Route>

        <Route path="Events" element={<Events />}></Route>
        <Route path="Friends" element={<Friends />}></Route>

        <Route path="Register" element={<Register />}></Route>
        <Route path="Login" element={<Login />}></Route>
        <Route path="TestAndAjax" element={<TestAndAjax />}></Route>
        <Route path="AddFriend/*" element={<AddFriend />}>
          <Route path=":friendId" element={<AddFriend />}></Route>
        </Route>
        <Route path="Friends" element={<Friends />}></Route>

        <Route path="Cars" element={<Cars />}></Route>
      </Routes> */}

      <Footer></Footer>
    </React.Fragment>
  );
}
export default App;
