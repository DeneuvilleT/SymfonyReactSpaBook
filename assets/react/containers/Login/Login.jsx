import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../../Store/slices/authSlices";
import { Icon } from "@iconify/react";
import Logup from "../Logup/Logup";

import axios from "axios";
import styles from "./login.styles.scss";

const Login = ({ isLog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [msgErr, setMsgErr] = useState("");
  const [icone, setIcone] = useState("line-md:arrow-right-circle");
  const [canSave, setCanSave] = useState(false);
  const [formData, setFormData] = useState({
    _email: "",
    _password: "",
  });

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
    document.body.classList.add('slide');
  }

  return (
    <main className={styles.formLog}>
      <div className={styles.formContainer}>
        {isLog ? (
          <Logup />
        ) : (
          <>
            <div className={styles.formBoxContainer}>
              <h2>Vous possédez déjà un compte ?</h2>

              <button onClick={() => handleChangeForm()} className={styles.formSignInBtn}>Connexion</button>

              {/* <form onSubmit={handleSubmit}>
                <input type="email" name="_email" value={formData._email} onChange={handleInputChange} />

                <input type="password" name="_password" value={formData._password} onChange={handleInputChange} />

                <span>{msgErr}</span>

                <button onClick={(e) => handleSubmit(e)} disabled={!canSave}>
                  Se connecter <Icon icon={icone} color="white" width="30" height="30" />
                </button>
              </form> */}

            </div>

            <div className={styles.formBoxContainer}>
              <h2>Vous ne disposez pas de compte ?</h2>
              <button className={styles.formSignUpBtn}>Inscription</button>
            </div>

            <div className={styles.formBox}></div>
          </>
        )}
      </div>

    </main>
  );
};

export default Login;
