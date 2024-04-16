import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Details = ({ cottage, display }) => {
  const navigate = useNavigate();

  const [heightLine, setHeightLine] = useState(60);

  useEffect(() => {
    setHeightLine(heightLine * 2);
  }, []);

  return (
      <aside style={{ height: display ? `${heightLine}px` : "0" }}>
      <div>
        <p
          dangerouslySetInnerHTML={{
            __html: cottage.description,
          }}
        />
        <p>{(Number(cottage.price) / 100).toFixed(2)} €</p>
      </div>
    </aside>
  );
};

export default Details;
