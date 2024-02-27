import React from "react";

import { useSelector } from "react-redux";

import styles from "./home.styles.scss";

const Home = () => {
  const { locations } = useSelector((state) => ({ ...state.location }));

  return (
    <main className={styles.home}>
      <section>

        {/* Afficher les locations */}
        {locations.length !== 0 ? (
          <aside className={styles.locations}>
            <h2>Locations trouvées :</h2>
            <ul>
              {locations.map((location) => (
                <>
                  <li
                    key={location.id}
                    style={{ backgroundImage: `url('${window.location.origin}/uploads/images/${location.cottage.covers[0].path}')` }}
                  >
                    <h3>{location.cottage.name}</h3>
                    <p dangerouslySetInnerHTML={{ __html: location.cottage.description }} />
                  </li>

                  {location.cottage.covers.length !== 0 ? (
                    <ul>
                      {location.cottage.covers.map((cover) => (
                        <li key={cover.id}>
                          <img src={`${window.location.origin}/uploads/images/${cover.path}`} alt={`Photo ${location.cottage.name}`} />{" "}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <></>
                  )}
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
