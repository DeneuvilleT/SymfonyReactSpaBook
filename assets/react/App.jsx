import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Slider from "./components/Slider/Slider";
import Privacy from "./components/Privacy/Privacy";
import Header from "./containers/Header/Header";
import Authentication from "./utilities/Authentication";
import Home from "./containers/Home/Home";
import AboutUs from "./containers/AboutUs/AboutUs";
import Summary from "./containers/Summary/Summary";
import ProfileBridge from "./containers/ProfileBridge/ProfileBridge";
import UserDatas from "./containers/ProfileBridge/UserDatas/UserDatas";
import UserBookings from "./containers/ProfileBridge/UserBookings/UserBookings";
import Login from "./containers/Login/Login";
import Footer from "./containers/Footer/Footer";
import Notfound from "./components/PageNotFound/Notfound";

import styles from "./containers/Header/header.styles.scss";

const App = ({ container }) => {
  const locationHook = useLocation();
  const headerDom = useRef(null);

  const [backBuy, setBackBuy] = useState(null);

  useEffect(() => {
    if (
      locationHook.search === "?param=register" ||
      locationHook.pathname === "/login"
    ) {
      headerDom.current.classList.add(styles.hide);
    } else {
      headerDom.current.classList.remove(styles.hide);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [locationHook]);

  useEffect(() => {
    if (container.dataset.back || container.dataset.back !== false) {
      setBackBuy(container.dataset.back);
    }
  }, [container]);

  return (
    <>
      <Slider />
      <Privacy success={backBuy} />

      <Header headerDom={headerDom} />
      <Routes>
        <Route
          path="/"
          element={<Authentication child={Home} auth={false} />}
        />
        <Route
          path="/about_us"
          element={<Authentication child={AboutUs} auth={false} />}
        />

        <Route
          path="/summary"
          element={<Authentication child={Summary} auth={false} />}
        />

        <Route
          path="/profile"
          element={<Authentication child={ProfileBridge} auth={true} />}
        />
        <Route
          path="/user/datas"
          element={<Authentication child={UserDatas} auth={true} />}
        />
        <Route
          path="/user/reservations"
          element={<Authentication child={UserBookings} auth={true} />}
        />

        <Route
          path="/login"
          element={<Authentication child={Login} auth={false} />}
        />

        <Route path="/notFound" element={<Notfound />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
