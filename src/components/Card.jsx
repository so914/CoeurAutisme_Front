import FruitImage from "./FruitImage";
import { ASSETS } from "../data/assets";

const Card = ({
  cardData,
  size,
  isFlipped,
  isMatched,
  onClick
}) => {

  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={onClick}
      style={{
        width: size,
        height: size
      }}
    >
      <div className="card-inner">

        <div
          className="card-back"
        />

        <div className="card-front d-flex flex-column align-items-center justify-content-center">
          <FruitImage fruit={cardData.fruit} />
          <p className="fruit-name">{cardData.fruit.name}</p>
        </div>

      </div>
    </div>
  );
};

export default Card;