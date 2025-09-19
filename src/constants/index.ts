import golf1 from "@/assets/golf1.jpg";
import golf2 from "@/assets/golf2.jpg";
import golf3 from "@/assets/golf3.jpg";
import golf4 from "@/assets/golf4.jpg";
import golf5 from "@/assets/golf5.jpg";
import golf6 from "@/assets/golf6.jpg";

export const courses = [
  {
    id: 1,
    title: "Green Valley Golf Club",
    status: "Closed" as const,
    image: golf1,
    address:
      "123 Fairway Drive, Copenhagen, Very Long Street That Will Truncate",
  },
  {
    id: 2,
    title: "Blue Lake Golf Club",
    status: "Open" as const,
    image: golf2,
    address: "456 Lakeview Road, Oslo",
  },
  {
    id: 3,
    title: "Mountain View Golf",
    status: "Open" as const,
    image: golf3,
    address: "789 Highland Drive, Stockholm",
  },
  {
    id: 4,
    title: "Sunset Hills Golf",
    status: "Closed" as const,
    image: golf4,
    address: "321 Sunset Blvd, Helsinki",
  },
  {
    id: 5,
    title: "Mountain View Golf",
    status: "Open" as const,
    image: golf5,
    address: "789 Highland Drive, Stockholm",
  },
  {
    id: 6,
    title: "Sunset Hills Golf",
    status: "Closed" as const,
    image: golf6,
    address: "321 Sunset Blvd, Helsinki",
  },
];
