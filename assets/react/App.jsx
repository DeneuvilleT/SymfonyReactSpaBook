import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import Slider from "./components/Slider/Slider";
import Header from "./containers/Header/Header";
import Footer from "./containers/Footer/Footer";
import Privacy from "./components/Privacy/Privacy";
import AboutUs from "./containers/AboutUs/AboutUs";
import Summary from "./containers/Summary/Summary";
import Authentication from "./utilities/Authentication";
import Notfound from "./components/PageNotFound/Notfound";
import ProfileBridge from "./containers/ProfileBridge/ProfileBridge";
import UserDatas from "./containers/ProfileBridge/UserDatas/UserDatas";
import UserBookings from "./containers/ProfileBridge/UserBookings/UserBookings";

import styles from "./containers/Header/header.styles.scss";
import Mentions from "./containers/Mentions/Mentions";
import Conditions from "./containers/Conditions/Conditions";
import Paiements from "./containers/Paiements/Paiements";

const App = ({ container }) => {
  const locationHook = useLocation();
  const headerDom = useRef(null);

  const [notif, setNotif] = useState(null);

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
      setNotif(container.dataset.back);
    }
  }, [container]);

  return (
    <>
      <Slider />
      <Privacy notif={notif} container={container} resetNotif={setNotif} />

      <Header headerDom={headerDom} />
      <Routes>
        <Route
          path="/"
          element={<Authentication child={Home} auth={false} />}
        />
        <Route
          path="/qui-sommes-nous"
          element={<Authentication child={AboutUs} auth={false} />}
        />
        <Route
          path="/mentions-legales"
          element={<Authentication child={Mentions} auth={false} />}
        />
        <Route
          path="/conditions-generales-de-ventes"
          element={<Authentication child={Conditions} auth={false} />}
        />
        <Route
          path="/moyens-de-paiements"
          element={<Authentication child={Paiements} auth={false} />}
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
