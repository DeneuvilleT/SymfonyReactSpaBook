import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchBookings,
  getAllBookings,
  getBookingsErrors,
  getBookingsStatus,
} from "../../../Store/slices/bookingsSlices";

import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import styles from "./userBookings.styles.scss";
import Details from "./Details/Details";

const UserBookings = ({ infos }) => {
  const dispatch = useDispatch();

  const allBookings = useSelector(getAllBookings);
  const bookingsStatus = useSelector(getBookingsStatus);
  const bookingsErrors = useSelector(getBookingsErrors);

  const [errMsg, setErrMsg] = useState("");
  const [bookings, setBookings] = useState([]);
  const [show, setShow] = useState({});

  useEffect(() => {
    if (bookingsStatus === "idle" && infos.uid) {
      dispatch(fetchBookings(infos.uid));
    }
  }, [bookingsStatus, dispatch, infos]);

  useEffect(() => {
    if (bookingsStatus === "succeeded") {
      setBookings([...allBookings]);
    } else if (bookingsStatus === "failed") {
      setErrMsg(bookingsErrors);
    }
  }, [bookingsStatus, dispatch]);

  switch (bookingsStatus) {
    case "loading":
      return (
        <main className={styles.userBookings}>
          <Icon
            style={{ marginTop: "150px" }}
            icon="svg-spinners:blocks-shuffle-3"
            width="150"
            height="150"
          />
          ;
        </main>
      );

    case "succeeded":
      return (
        <main className={styles.userBookings}>
          <section>
            <h2>Vos réservations :</h2>
            {bookings.length ? (
              bookings?.map((booking) => (
                <article
                  key={booking.id}
                  onClick={() => {
                    setShow({
                      ...show,
                      [booking.id]: show[booking.id] ? false : true,
                    });
                  }}
                >
                  <aside>
                    <img
                      alt={booking.cottage.name}
                      src={`${window.location.origin}/uploads/images/${
                        booking.cottage.covers.find((x) => x.priority === 1)
                          ?.path || ""
                      }`}
                    />

                    <div>
                      <p>
                        Location du&nbsp;
                        <b>
                          {format(new Date(booking.start), "dd MMMM yyyy", {
                            locale: fr,
                          })}
                        </b>
                        <br /> au&nbsp;
                        <b>
                          {format(new Date(booking.end), "dd MMMM yyyy", {
                            locale: fr,
                          })}
                        </b>
                      </p>

                      <p>
                        <strong>
                          {(Number(booking.price) / 100)
                            .toString()
                            .replace(".", ",")}{" "}
                          €
                        </strong>
                      </p>

                      <span>
                        <em>{booking.traveller} personne(s)</em>
                        <em>
                          créé le
                          {format(new Date(booking.createdAt), "dd MMMM yyyy", {
                            locale: fr,
                          })}
                        </em>
                      </span>
                    </div>
                  </aside>

                  <Details
                    cottage={booking.cottage}
                    display={show[booking.id]}
                    booking={booking}
                  />
                </article>
              ))
            ) : (
              <h3>
                <Icon
                  icon="line-md:emoji-frown-open"
                  color="#333"
                  width="60"
                  height="60"
                />{" "}
                Vous n'avez pas encore de réservations.
              </h3>
            )}
          </section>
        </main>
      );

    case "failed":
      return <p>{errMsg}</p>;
  }
};

export default UserBookings;
