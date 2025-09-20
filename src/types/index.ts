export type Status = "Open" | "Closed";

export type TimeString = `${string}:${string}`;

export const isTimeString = (s: string): s is TimeString =>
  /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(s);

export interface Facility {
  id: string;
  name: string;
  address: string;
  description: string;
  imageUrl: string;
  openingTime: TimeString;
  closingTime: TimeString;
  isDefault: boolean;
  createdAt?: Date;
}

export const setDefaultFacility = (
  facilities: Facility[],
  id: string,
): Facility[] => facilities.map((f) => ({ ...f, isDefault: f.id == id }));

export type CardData = {
  id: string | number;
  title: string;
  status?: Status;
  image: string;
  address: string;
};

export type CardProps = Omit<CardData, "id">;

export type CardGridProps = {
  cards: CardData[];
};

export type ButtonProps = {
  id: string;
  title?: string;
  icon?: React.ReactNode;
  containerClass?: string;
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
