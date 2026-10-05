import PropTypes from "prop-types";
import { FaPepperHot } from "react-icons/fa";
import {useState} from "react";

import "./Dish.css";
import Card from "../Card";

const Dish = (props) => {
  PropTypes.checkPropTypes(Dish.propTypes, props, "prop", "Dish");

const { image, name, category, price, spicy = true, currency = "ETB"} = props;

const [count , setCount] = useState(0);

function add() {
  setCount(count + 1)
}

  return (
    <div className="dish">
      <Card>
         <div className="image-container">
        <img className="card-image" src={image} alt={name} />
        </div>
        <div className="text-container">
        <h3>{name}</h3>
         <strong>
          {price} {currency}
        </strong>
        <strong>{category}</strong>
        <h3>
           {spicy === true && <FaPepperHot/>}
        </h3>
        </div>
        <button onClick={add}>Add to chart</button>
        <p>Quantity: {count} </p>
      </Card>
      </div>
  );
};

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  image: PropTypes.string.isRequired,
  currency: PropTypes.string,
};

export default Dish;