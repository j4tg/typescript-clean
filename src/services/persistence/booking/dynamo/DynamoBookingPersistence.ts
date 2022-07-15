import { BookingPersistence } from "../BookingPersistence";
import { Booking } from "../Booking";

export class DynamoBookingPersistence implements BookingPersistence {
  create(booking: Booking): void {}

  getById(id: string): Booking {
    return {
      id: "",
    };
  }
}
