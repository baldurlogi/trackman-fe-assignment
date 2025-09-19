import Card from "./Card";
import { type CardGridProps } from "@/types";

const CardGrid = ({ cards }: CardGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          status={card.status}
          image={card.image}
          address={card.address}
        />
      ))}
    </div>
  );
};

export default CardGrid;
