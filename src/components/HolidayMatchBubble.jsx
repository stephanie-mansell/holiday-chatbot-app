import { useState } from "react";
import "./HolidayMatchBubble.css";
import Modal from "./Modal";

function HolidayMatchBubble(props) {
  const [modal, setModal] = useState(false);

  function modalHandler() {
    setModal(true);
  }

  function modalClose() {
    setModal(false);
  }

  const recommendation = props.recommendation;

  return (
    <>
      <div className="city-wrapper" data-testid="match-bubble-test">
        <div
          onClick={modalHandler}
          className="city-background"
          style={{ backgroundImage: `url(${recommendation.img})` }}
        ></div>
        <div className="city-content">
          <span className="city">
            {recommendation.city}, {recommendation.country}!
          </span>
        </div>
      </div>

      {modal && <Modal holiday={recommendation} close={modalClose} />}
    </>
  );
}

export default HolidayMatchBubble;
