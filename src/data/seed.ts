import type { Facility } from "@/types";

export const seedFacilities: Facility[] = [
  {
    id: "seed-1",
    name: "Royal Gold Center",
    address: "456 Golf Lane, Aarhus, Denmark",
    description: "18-hole parkland course with covered bays.",
    imageUrl:
      "https://images.unsplash.com/photo-1500932334442-8761ee4810a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    openingTime: "08:00",
    closingTime: "22:00",
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-2",
    name: "Green Valley Golf Club",
    address: "123 Fairway Drive, Copenhagen, Denmark",
    description: "Waterside driving range and short game area.",
    imageUrl:
      "https://images.unsplash.com/photo-1606443192517-919653213206?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    openingTime: "09:00",
    closingTime: "17:00",
    isDefault: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-3",
    name: "Nordics Hills Golf Resort",
    address: "789 Birdie Street, Odense, Denmark",
    description: "Lit bays, perfect for night practice.",
    imageUrl:
      "https://images.unsplash.com/photo-1605147861225-7bcd55f8e513?q=80&w=1908&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    openingTime: "22:00",
    closingTime: "06:00",
    isDefault: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-4",
    name: "Blue Lake Golf Club",
    address: "101 Par Avenue, Aalborg, Denmark",
    description: "18-hole parkland course with covered bays.",
    imageUrl:
      "https://images.unsplash.com/photo-1632946269126-0f8edbe8b068?q=80&w=1731&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    openingTime: "01:00",
    closingTime: "23:00",
    isDefault: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-5",
    name: "Sunset Golf Park",
    address: "555 Eagle Way, Esbjerg, Denmark",
    description: "Waterside driving range and short game area.",
    imageUrl:
      "https://images.unsplash.com/photo-1587684724118-a26a15613d26?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    openingTime: "08:00",
    closingTime: "09:00",
    isDefault: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "seed-6",
    name: "Copenhagen Golf Park",
    address: "12 Golfvej, Copenhagen, Denmark",
    description: "Lit bays, perfect for night practice.",
    imageUrl:
      "https://images.unsplash.com/photo-1516705416642-fa4f130a0bb3?q=80&w=1830&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    openingTime: "08:00",
    closingTime: "22:00",
    isDefault: false,
    createdAt: new Date().toISOString(),
  },
];
