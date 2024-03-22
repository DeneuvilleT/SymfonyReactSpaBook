import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setSlider } from "../../Store/slices/sliderSlices";

import Logo from "../../components/Logo/Logo";
import styles from "./home.styles.scss";
import faces from "../../../../public/images/FACES/face_2.jpg";

const Home = () => {
  const { locations } = useSelector((state) => ({ ...state.location }));

  const dispatch = useDispatch();

  return (
    <main className={styles.home}>
      <Logo />
      <section>
        {locations.length !== 0 ? (
          <ul className={styles.locations}>
            {locations.map((location) => (
              <li key={location.id}>
                <div className={styles.cardsLoc}>
                  <div
                    className={styles.imgBox}
                    style={{
                      backgroundImage: `url('${
                        window.location.origin
                      }/uploads/images/${
                        location.cottage.covers.find((x) => x.priority === 1)
                          ?.path || ""
                      }')`,
                    }}
                  ></div>

                  <div className={styles.content}>
                    <span>
                      <h3>{location.cottage.name}</h3>
                    </span>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: location.cottage.description,
                      }}
                    />
                  </div>
                </div>

                {location.cottage.covers.length !== 0 ? (
                  <ul className={styles.thumbails}>
                    {location.cottage.covers.map((cover) => (
                      <li
                        onClick={() => {
                          dispatch(setSlider(location.cottage.covers));
                        }}
                        key={cover.id}
                        style={{
                          backgroundImage: `url('${window.location.origin}/uploads/images/${cover.path}')`,
                        }}
                      ></li>
                    ))}
                  </ul>
                ) : (
                  <></>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <>
            <div role="figure"></div>
            <article className={styles.welcome}>
              <div className={styles.textBox}>
                <h2>
                  Profitez de la <span>nature</span>
                  <br />
                  pour vous détendre
                </h2>
                <p>
                  <span>
                    Bienvenue sur notre plateforme de location de gîtes et
                    cabanes, où la nature est au cœur de votre séjour ! Plongez
                    dans un monde où la tranquillité règne et où chaque souffle
                    de vent vous transporte dans une aventure en harmonie avec
                    la nature.
                  </span>
                  <span>
                    Notre site vous offre une sélection exclusive de gîtes et de
                    cabanes nichés au cœur de paysages pittoresques, vous
                    invitant à vous ressourcer loin de l'agitation urbaine.
                  </span>
                  <span>
                    Découvrez nos hébergements uniques, tous soigneusement
                    sélectionnés pour vous offrir une expérience authentique et
                    immersive. Que vous recherchiez une retraite romantique en
                    amoureux, une escapade en famille ou une aventure entre
                    amis, nous avons le lieu idéal pour répondre à vos besoins.
                  </span>
                  <Link to={"/about_us"}>En apprendre plus</Link>
                </p>
              </div>
              <div className={styles.imageBox}>
                <img src={faces} title="Photo des propriétaires" />
              </div>
            </article>
          </>
        )}
      </section>
    </main>
  );
};

export default Home;
