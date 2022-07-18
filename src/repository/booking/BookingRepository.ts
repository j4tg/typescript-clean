import { Booking } from "./Booking";

export interface BookingRepository {
  create(booking: Booking): void;
}
