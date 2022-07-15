import { Booking } from "./Booking";

export interface BookingPersistence {
  create(booking: Booking): void;
}
