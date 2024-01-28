import React, { Fragment, useState } from "react";
import axios from "axios";

import { Icon } from "@iconify/react";
import { notification } from "../../utilities";

import styles from "./formBook.styles.scss";

const FormBook = ({ url, btnSubmit, hasLabel, after, inputs, success }) => {
  const initialFormData = Object.fromEntries(
    Object.entries(inputs).map(([key, input]) => [key, key === "type" ? input.value || 0 : input.value || ""])
  );

  const [icone, setIcone] = useState("lets-icons:search-light");
  const [formData, setFormData] = useState(initialFormData);
  const [canSave, setCanSave] = useState(false);
  const [msgsErr, setMsgsErr] = useState([]);
  const [msgSuccess, setMsgSuccess] = useState(success);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (canSave) {
      setCanSave(false);
      try {
        setIcone("svg-spinners:90-ring-with-bg");

        const response = await axios.post(url, formData);
        setMsgsErr([]);

        if (response.status === 200) {
          setIcone("lets-icons:search-light");
          // return after ? location.reload() : (location.href = "/");
        }
      } catch (err) {
        console.log(err)
        setIcone("line-md:arrow-right-circle");
        return setMsgsErr([...JSON.parse(err.response.data).errors]);
      }
    }
  };

  const handleInputChange = (e) => {
    setMsgsErr([]);
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;
    const updatedFormData = { ...formData, [name]: updatedValue };

    setFormData(updatedFormData);
    setCanSave(Object.values(updatedFormData).every((val) => val !== "") ? true : false);
  };

  return (
    <form className={styles.formBook}>
      <aside>
        {Object.entries(inputs).map(([key, input]) =>
          input.type !== "checkbox" ? (
            <div key={key}>
              {hasLabel && input.type !== "hidden" ? <label htmlFor={`post_${input.name}`}>{input.label}</label> : <></>}

              {input.type !== "select" ? (
                <input
                  type={input.type}
                  name={input.name}
                  id={`post_${input.name}`}
                  value={formData[key]}
                  placeholder={!hasLabel ? input.label.toLowerCase() : ""}
                  onChange={handleInputChange}
                />
              ) : input.type !== "checkbox" ? (
                <select name={input.name} value={formData[key]} onChange={handleInputChange} id={`post_${input.name}`}>
                  {input.option?.map((x, i) => (
                    <option key={i} value={x.value}>
                      {x.text}
                    </option>
                  ))}
                </select>
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
          <Icon icon={icone} color="white" width="30" height="30" />
        </button>
      </aside>

      <aside>
        {Object.entries(inputs).map(([key, input]) =>
          input.type === "checkbox" ? (
            <div key={key}>
              {hasLabel ? <label htmlFor={`post_${input.name}`}>{input.label}</label> : <></>}

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
                <Icon icon="line-md:alert-twotone" color="white" width="23" height="23" />
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
