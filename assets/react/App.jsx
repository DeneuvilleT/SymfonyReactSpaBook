import React, { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./containers/Header/Header";
import Home from "./containers/Home/Home";
import Footer from "./containers/Footer/Footer";
import Product from "./components/Product/Product";
import Logup from "./containers/Logup/Logup";
import Logout from "./containers/Logout/Logout";
import Login from "./containers/Login/Login";
import Cart from "./containers/Cart/Cart";
import Notfound from "./components/PageNotFound/Notfound";
import Authentication from "./utilities/Authentication";
import ProfileBridge from "./containers/ProfileBridge/ProfileBridge";
import UserDatas from "./containers/ProfileBridge/UserDatas/UserDatas";
import UserComments from "./containers/ProfileBridge/UserComments/UserComments";
import UserOrders from "./containers/ProfileBridge/UserOrders/UserOrders";
import Notif from "./components/Notif/Notif";
import Slider from "./components/Slider/Slider";

import { useDispatch } from "react-redux";
import { clearCart } from "./Store/slices/cartSlices";

import styles from './containers/Header/header.styles.scss';

const App = ({ container }) => {

  const dispatch = useDispatch();
  const locationHook = useLocation();
  const headerDom = useRef(null);

  useEffect(() => {
    if (location.hash === '#/login#register' || location.hash === '#/login') {
      headerDom.current.classList.add(styles.hide);
    } else {
      headerDom.current.classList.remove(styles.hide);
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }, [locationHook]);

  useEffect(() => {
    if (container.dataset.clean) {
      dispatch(clearCart());
      container.removeAttribute("data-clean");
    }
  }, [container.dataset.clean, dispatch]);

  return (
    <>
      <Slider />
      <Notif />
      <Header headerDom={headerDom} />
      <Routes>
        <Route path="/" element={<Authentication child={Home} auth={false} />} />
        <Route path="product/:id" element={<Authentication child={Product} auth={false} />} />

        <Route path="/cart" element={<Authentication child={Cart} auth={false} />} />

        <Route path="/profile" element={<Authentication child={ProfileBridge} auth={true} />} />
        <Route path="/user/datas" element={<Authentication child={UserDatas} auth={true} />} />
        <Route path="/user/orders" element={<Authentication child={UserOrders} auth={true} />} />
        <Route path="/user/comments" element={<Authentication child={UserComments} auth={true} />} />

        <Route path="/register" element={<Authentication child={Logup} auth={false} />} />
        <Route path="/login" element={<Authentication child={Login} auth={false} />} />
        <Route path="/logout" element={<Authentication child={Logout} auth={true} />} />

        <Route path="/notFound" element={<Notfound />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
