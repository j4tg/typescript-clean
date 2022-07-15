import { BookingPersistence } from "../BookingPersistence";
import { Booking } from "../Booking";
import { Logger } from "../../../logger/Logger";

export class DynamoBookingPersistence implements BookingPersistence {
  constructor(private logger: Logger) {}

  create(booking: Booking): void {
    this.logger.debug("dynamodb booking create", booking);
  }
}
