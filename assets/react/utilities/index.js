import stylesHeader from "../containers/Header/header.styles.scss";
import stylesHome from "../containers/Home/home.styles.scss";

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
    headerDom.classList.toggle(stylesHeader.hide);
  } else {
    headerDom.classList.remove(stylesHeader.hide);
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const displayLoader = () => {
  const loader = document.querySelector('div[role="switch"]');

  loader.classList.add(stylesHome.loading);

  setTimeout(() => {
    loader.classList.remove(stylesHome.loading);
  }, 4000);
};
