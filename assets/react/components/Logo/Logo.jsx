import React, { useRef } from "react";
import styles from "./logo.styles.scss";
import { Link } from "react-router-dom";

const Logo = ({ page }) => {
    const titleContainer = useRef(null);

    return (
        <Link to={'/'}
            ref={titleContainer}
            className={`${styles.logo} ${page === "login" ? styles.loginLogo : ''}`}
        >
            <h1>
                <span>Cabane</span>
                <div>
                    <span style={{ fontSize: "1.25em" }}>et</span>
                    <span style={{ fontSize: "1.25em" }}>gite</span>
                    <span style={{ fontSize: "1.25em" }}>au</span>
                    <span style={{ fontSize: "1.25em" }}>naturel</span>
                </div>
            </h1>
        </Link>
    );
};

export default Logo;
