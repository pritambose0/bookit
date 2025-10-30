export interface Slot {
  _id: string;
  date: string;
  time: string;
  bookedCount: number;
  capacity: number;
  seatsLeft: number;
  available: boolean;
}

export interface Experience {
  _id: string;
  title: string;
  description: string;
  location: string;
  image: string;
  price: number;
  currency: string;
  about?: string;
  slots: Slot[];
}
