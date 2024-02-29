import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import styles from "./home.styles.scss";

const Home = () => {
  const { locations } = useSelector((state) => ({ ...state.location }));

  return (
    <main className={styles.home}>
      <h1>
        <Link to={"/"}>Cabane et gîte au naturel</Link>
      </h1>

      <section>
        {/* Afficher les locations */}
        {locations.length !== 0 ? (
          <aside className={styles.locations}>
            <ul>
              {locations.map((location) => (
                <>
                  <li key={location.id}>
                    <div className={styles.cardsLoc}>
                      <div
                        className={styles.imgBox}
                        style={{ backgroundImage: `url('${window.location.origin}/uploads/images/${location.cottage.covers[0].path}')` }}
                      ></div>

                      <div className={styles.content}>
                        <span>
                          <h3>{location.cottage.name}</h3>
                        </span>
                        <p dangerouslySetInnerHTML={{ __html: location.cottage.description }} />
                      </div>
                    </div>

                    {location.cottage.covers.length !== 0 ? (
                      <ul className={styles.thumbails}>
                        {location.cottage.covers.map((cover) => (
                          <li key={cover.id}>
                            <img src={`${window.location.origin}/uploads/images/${cover.path}`} alt={`Photo ${location.cottage.name}`} />{" "}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <></>
                    )}
                  </li>
                </>
              ))}
            </ul>
          </aside>
        ) : (
          <></>
        )}
      </section>
    </main>
  );
};

export default Home;
