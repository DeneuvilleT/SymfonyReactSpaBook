import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import {
  setLocations,
  deleteLocations,
} from "../../Store/slices/locationsSlices";

import { Icon } from "@iconify/react";

import styles from "./formBook.styles.scss";
import axios from "axios";

const FormBook = ({ url, btnSubmit, hasLabel, inputs }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormData = Object.fromEntries(
    Object.entries(inputs).map(([key, input]) => [
      key,
      key === "type" ? input.value || 0 : input.value || "",
    ])
  );

  const [icone, setIcone] = useState("lets-icons:search-light");
  const [formData, setFormData] = useState(initialFormData);
  const [canSave, setCanSave] = useState(false);
  const [msgsErr, setMsgsErr] = useState([]);
  const [inputValues, setInputValues] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (canSave) {
      setIcone("svg-spinners:90-ring");

      try {
        const response = await axios.post(url, formData);
        setMsgsErr([]);

        if (response.status === 200) {
          if (response.data.length !== 0) {
            navigate("/");
            setTimeout(() => {
              dispatch(setLocations(response.data));
              setIcone("lets-icons:search-light");
            }, 1000);
          } else {
            dispatch(deleteLocations());
            setIcone("lets-icons:search-light");
            return setMsgsErr([
              "Aucun hébergement n'a été trouvé, vous pouvez réessayer avec d'autres paramètres",
            ]);
          }
        }
      } catch (err) {
        console.log(err);
        return setMsgsErr([...JSON.parse(err.response.data).errors]);
      }
    }
  };

  const handleInputChange = (e) => {
    setMsgsErr([]);
    const { name, value, type, checked } = e.target;

    let updatedValue;

    if (type === "checkbox") {
      updatedValue = checked;
    } else {
      updatedValue = value;
    }

    const updatedFormData = { ...formData, [name]: updatedValue };

    // Entre les valeurs séléctionnés dans l'objet
    setFormData(updatedFormData);

    // Gére les inputs checkbox pour true et false
    const canSaveUpdated = Object.entries(updatedFormData)
      .filter(([name, value]) => {
        return inputs[name].required && inputs[name].type !== "checkbox";
      })
      .every(([name, value]) => value !== "");

    // Dévérouille le bouton submit quand toutes les valeurs sont séléctionnés
    setCanSave(canSaveUpdated);

    // Cache les labels quand une valeur est sélectionnée
    setInputValues({ ...inputValues, [name]: updatedValue });
  };

  return (
    <form className={styles.formBook}>
      <aside>
        {Object.entries(inputs).map(([key, input]) =>
          input.type !== "checkbox" ? (
            <div key={key}>
              {input.type !== "select" ? (
                <input
                  type={input.type}
                  name={input.name}
                  {...(input.type === "number" ? { min: "0" } : {})}
                  {...(input.type === "number" ? { max: "6" } : {})}
                  id={`post_${input.name}`}
                  value={formData[key]}
                  placeholder={!hasLabel ? input.label.toLowerCase() : ""}
                  onChange={handleInputChange}
                />
              ) : input.type !== "checkbox" ? (
                <select
                  name={input.name}
                  value={formData[key]}
                  onChange={handleInputChange}
                  id={`post_${input.name}`}
                >
                  <option value="" disabled></option>
                  {input.option?.map((x, i) => (
                    <option key={i} value={x.value}>
                      {x.text}
                    </option>
                  ))}
                </select>
              ) : (
                <></>
              )}
              {!hasLabel || (hasLabel && !inputValues[input.name]) ? (
                <label htmlFor={`post_${input.name}`}>{input.label}</label>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <Fragment key={key}></Fragment>
          )
        )}

        <button onClick={(e) => handleSubmit(e)} disabled={!canSave}>
          {btnSubmit}
          <Icon
            icon={icone}
            color="white"
            width={icone === "lets-icons:search-light" ? "30" : "20"}
            height={icone === "lets-icons:search-light" ? "30" : "20"}
          />
        </button>
      </aside>

      <aside>
        {Object.entries(inputs).map(([key, input]) =>
          input.type === "checkbox" ? (
            <div key={key}>
              {hasLabel ? (
                <label htmlFor={`post_${input.name}`}>{input.label}</label>
              ) : (
                <></>
              )}

              <input
                type={input.type}
                name={input.name}
                id={`post_${input.name}`}
                value={formData[key]}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <Fragment key={key}></Fragment>
          )
        )}
      </aside>

      <ul>
        {msgsErr.length > 0 && (
          <div className="error-messages">
            {msgsErr.map((err, index) => (
              <span key={index}>
                <Icon icon="uiw:warning" color="white" width="25" height="25" />
                {err}
              </span>
            ))}
          </div>
        )}
      </ul>
    </form>
  );
};

export default FormBook;
