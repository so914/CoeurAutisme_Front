import Card from "./Card";

const CardGrid = ({
  deck = [],
  flipped = [],
  matched = new Set(),
  onCardClick,
  columns
}) => {

  return (
    <div
      className="card-grid d-flex flex-wrap gap-3 justify-content-center"
      style={{
        gridTemplateColumns: `repeat(${columns}, 120px)`
      }}
    >
      {deck.map((card, index) => (
        <div className="card-grid-container">
                 <Card
          key={card.uid}
          cardData={card}
          size={180}
          isFlipped={
            flipped.includes(index) ||
            matched.has(index)
          }
          isMatched={matched.has(index)}
          onClick={() => onCardClick(index)}
        />
        </div>
 

      ))}
    </div>
  );
};

export default CardGrid;