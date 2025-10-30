export interface SlotSelection {
  date: string;
  time: string;
}

export interface PromoCode {
  _id: string;
  code: string;
  type: "percent" | "fixed";
  value: number;
  validTill: Date;
}

export interface CartItem {
  _id?: string;
  name: string;
  email: string;
  quantity: number;
  experienceId: string;
  slot?: SlotSelection;
  promocodeId?: string;
}

export interface NewBookingData {
  experienceId: string;
  title: string;
  location: string;
  about?: string;
  date: string;
  time: string;
  quantity: number;
  subTotal: number;
  tax: number;
  total: number;
}
