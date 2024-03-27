import styles from "../containers/Header/header.styles.scss";

export const valueOk =
  /(?=.*[a-z])+(?=.*[A-Z])+(?=.*[0-9])+(?=.*[^A-Za-z0-9])+(?=.{8,})/;

export const pagination = (array, max, setNewArray) => {
  const tempArr = [];

  for (let i = 0; i < array.length; i = i + max) {
    const slice = array.slice(i, i + max);
    tempArr.push(slice);
  }
  return setNewArray((data) => [...data, ...tempArr]);
};

export const creaDomElem = (
  elem,
  attribut = undefined,
  value = undefined,
  content = undefined
) => {
  const elementDom = document.createElement(elem);

  if (attribut !== undefined && value !== undefined)
    elementDom.setAttribute(attribut, value);

  if (content !== undefined) elementDom.innerHTML = content;

  return elementDom;
};

export const hideHeader = (toHide = true) => {
  const headerDom = document.querySelector("header");

  if (toHide) {
    headerDom.classList.toggle(styles.hide);
  } else {
    headerDom.classList.remove(styles.hide);
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};