import type { Facility } from "@/types";
import golf1 from "@/assets/golf1.jpg";
import golf2 from "@/assets/golf2.jpg";
import golf3 from "@/assets/golf3.jpg";
import golf4 from "@/assets/golf4.jpg";
import golf5 from "@/assets/golf5.jpg";
import golf6 from "@/assets/golf6.jpg";

export const seedFacilities: Facility[] = [
    {
        id: "seed-1",
        name: "Royal Gold Center",
        address: "456 Golf Lane, Aarhus, Denmark",
        description: "18-hole parkland course with covered bays.",
        imageUrl: golf1,
        openingTime: "08:00",
        closingTime: "22:00",
        isDefault: true,
        createdAt: new Date(),
    },
    {
        id: "seed-2",
        name: "Green Valley Golf Club",
        address: "123 Fairway Drive, Copenhagen, Denmark",
        description: "Waterside driving range and short game area.",
        imageUrl: golf2,
        openingTime: "09:00",
        closingTime: "17:00",
        isDefault: false,
        createdAt: new Date(),
    },
    {
        id: "seed-3",
        name: "Nordics Hills Golf Resort",
        address: "789 Birdie Street, Odense, Denmark",
        description: "Lit bays, perfect for night practice.",
        imageUrl: golf3,
        openingTime: "22:00",
        closingTime: "06:00",
        isDefault: false,
        createdAt: new Date(),
    },
    {
        id: "seed-4",
        name: "Blue Lake Golf Club",
        address: "101 Par Avenue, Aalborg, Denmark",
        description: "18-hole parkland course with covered bays.",
        imageUrl: golf4,
        openingTime: "01:00",
        closingTime: "23:00",
        isDefault: false,
        createdAt: new Date(),
    },
    {
        id: "seed-5",
        name: "Sunset Golf Park",
        address: "555 Eagle Way, Esbjerg, Denmark",
        description: "Waterside driving range and short game area.",
        imageUrl: golf5,
        openingTime: "08:00",
        closingTime: "09:00",
        isDefault: false,
        createdAt: new Date(),
    },
    {
        id: "seed-6",
        name: "Copenhagen Golf Park",
        address: "12 Golfvej, Copenhagen, Denmark",
        description: "Lit bays, perfect for night practice.",
        imageUrl: golf6,
        openingTime: "08:00",
        closingTime: "22:00",
        isDefault: false,
        createdAt: new Date(),
    },
]