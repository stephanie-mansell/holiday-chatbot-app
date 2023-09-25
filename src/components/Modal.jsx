import "./Modal.css";
import { AiFillStar } from "react-icons/ai";

function Modal(props) {
  const desc = props.holiday.description.map((description) => (
    <p>{description}</p>
  ));

  const rating = props.holiday.rating;
  let ratingStar = [];
  let i;

  for (i = 0; i < rating; i++) {
    ratingStar.push(<AiFillStar color="ffb83c" />);
  }

  return (
    <div className="modal-container" data-testid="modal-test">
      <div className="modal">
        <div className="img-container">
          <img
            src={props.holiday.img}
            alt={props.holiday.img}
            className="modal-img"
          />
        </div>
        <div className="desc">
          <h1>{props.holiday.city}</h1>
          <p>{desc}</p>
          <h2>
            Looking for a holiday package? <br />
            First Holiday has got you covered.
          </h2>
          <p>
            <b>Hotel:</b> {props.holiday["hotel-name"]}
            <br />
            <b>Star rating:</b> {ratingStar}
            <br />
            <b>Price per night with First Holiday's package deal:</b> £
            {props.holiday["price-per-night"]}
          </p>

          <button onClick={props.close} className="btn">
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
