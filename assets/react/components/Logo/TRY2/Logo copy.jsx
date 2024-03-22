import React, { useRef } from 'react'
import styles from "./logo.styles.scss"

const Logo = ({ page }) => {

    const titleContainer = useRef(null);

    return (
        <div ref={titleContainer} className={[styles.logo, page === "login" ? styles.loginLogo : '']} style={{ position: page === "login" ? "absolute" : "sticky" }}>
            <h1>
                <span>Cabane</span>
                <div>
                    <span>et gite</span>
                    <span>au naturel</span>
                </div>
            </h1>
        </div>
    )
}

export default Logo