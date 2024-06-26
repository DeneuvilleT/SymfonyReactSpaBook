import React, { useState } from "react";
import axios from "axios";

import { Icon } from "@iconify/react";

import styles from "./form.styles.scss";

const Form = ({ url, btnSubmit, hasLabel, after, inputs, secure = true }) => {
  const initialFormData = Object.fromEntries(
    Object.entries(inputs).map(([key, input]) => [
      key,
      key === "type" ? input.value || 0 : input.value || "",
    ])
  );

  const token = localStorage.getItem(`${location.origin}_bear_token`);

  const [icone, setIcone] = useState("bxs:right-arrow");
  const [formData, setFormData] = useState(initialFormData);
  const [canSave, setCanSave] = useState(false);
  const [msgsErr, setMsgsErr] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (canSave) {
      setCanSave(false);
      try {
        setIcone("svg-spinners:90-ring-with-bg");

        const response = secure
          ? await axios.post(url, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          : await axios.post(url, formData);

        setMsgsErr([]);

        if (response.status === 200) {
          setIcone("line-md:circle-to-confirm-circle-transition");
          return after
            ? location.reload()
            : after === null
            ? null
            : (location.href = "/");
        }
      } catch (err) {
        const errors = JSON.parse(err.response.data);
        if (Array.isArray(errors.errors)) {
          setMsgsErr([...errors.errors]);
        } else {
          setMsgsErr([errors.message]);
        }
        return setIcone("bxs:right-arrow");
      }
    }
  };

  const handleInputChange = (e) => {
    setMsgsErr([]);
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    setCanSave(
      Object.values(updatedFormData).every((val) => val !== "") ? true : false
    );
  };

  return (
    <form className={styles.form} onClick={() => setMsgsErr([])}>
      {Object.entries(inputs).map(([key, input]) => (
        <fieldset key={key}>
          {hasLabel && input.type !== "hidden" ? (
            <label htmlFor={`post_${input.name}`}>{input.label}</label>
          ) : (
            <></>
          )}

          {input.type !== "textarea" && input.type !== "select" ? (
            <input
              type={input.type}
              name={input.name}
              id={`post_${input.name}`}
              value={formData[key]}
              placeholder={!hasLabel ? input.label.toLowerCase() : ""}
              onChange={handleInputChange}
            />
          ) : input.type === "textarea" ? (
            <textarea
              name={input.name}
              value={formData[key]}
              onChange={handleInputChange}
            >
              {!hasLabel ? input.label.toLowerCase() : ""}
            </textarea>
          ) : (
            <select
              name={input.name}
              value={formData[key]}
              onChange={handleInputChange}
              id={`post_${input.name}`}
            >
              {input.option?.map((x, i) => (
                <option key={i} value={x.value}>
                  {x.text}
                </option>
              ))}
            </select>
          )}
        </fieldset>
      ))}

      <ul
        className={msgsErr.length !== 0 ? styles.error : ""}
        onClick={() => setMsgsErr([])}
      >
        {msgsErr.length > 0 && (
          <div className="error-messages">
            {msgsErr.map((err, index) => (
              <span key={index}>
                <Icon icon="line-md:alert-twotone" color="white" />
                {err}
              </span>
            ))}
          </div>
        )}
      </ul>

      <button onClick={(e) => handleSubmit(e)} disabled={!canSave}>
        {btnSubmit}
        <Icon icon={icone} color="white" width="18" height="18" />
      </button>
    </form>
  );
};

export default Form;
