import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../../Store/slices/authSlices";
import { Icon } from "@iconify/react";

import Logo from "../../components/Logo/Logo";
import Logup from "../Logup/Logup";

import axios from "axios";
import styles from "./login.styles.scss";

const Login = ({ isLog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formLog = useRef(null);

  const [msgErr, setMsgErr] = useState("");
  const [icone, setIcone] = useState("line-md:arrow-right-circle");
  const [canSave, setCanSave] = useState(false);
  const [formData, setFormData] = useState({
    _email: "",
    _password: "",
  });

  useEffect(() => {
    if (location.hash === '#/login#register') {
      formLog.current.classList.add(styles.formSlide);
    } else {
      formLog.current.classList.remove(styles.formSlide);
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.hash])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    setCanSave(Object.values(updatedFormData).every((val) => val !== "") ? true : false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (canSave) {
      try {
        setIcone("svg-spinners:90-ring-with-bg");

        const response = await axios.post("/api/login_check", {
          email: formData._email,
          password: formData._password,
        });

        if (response.status === 200) {
          dispatch(login(response.data));
          return navigate("/");
        } else {
          return setMsgErr(response.data.message);
        }
      } catch (err) {
        setIcone("line-md:arrow-right-circle");
        return setMsgErr(err.response.data.message);
      }
    }
  };

  const handleChangeForm = () => {
    formLog.current.classList.toggle(styles.formSlide);
  }

  return (
    <>
      <Logo page={"login"} />
      <main ref={formLog} className={styles.formLog}>
        <div className={styles.formContainer}>
          <div className={styles.formContainerBox}>
            <h2>Vous possédez déjà un compte ?</h2>

            <button onClick={() => handleChangeForm()} className={styles.formSignInBtn}>Connexion</button>
          </div>

          <div className={styles.formContainerBox}>
            <h2>Vous ne disposez pas de compte ?</h2>
            <button onClick={() => handleChangeForm()} className={styles.formSignUpBtn}>Inscription</button>
          </div>

          <div className={styles.formBox}>
            <div className={styles.formSignIn}>
              <h3>Connectez-vous</h3>
              <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" name="_email" value={formData._email} onChange={handleInputChange} />

                <input type="password" name="_password" placeholder="Mot de passe" value={formData._password} onChange={handleInputChange} />

                <span>{msgErr}</span>

                <button onClick={(e) => handleSubmit(e)} disabled={!canSave}>
                  Se connecter <Icon icon={icone} color="white" width="30" height="30" />
                </button>
              </form>
            </div>

            <div className={styles.formSignUp}>
              <Logup />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
