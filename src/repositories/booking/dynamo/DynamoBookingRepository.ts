import { BookingRepository } from "../BookingRepository";
import { Booking } from "../Booking";
import { Logger } from "../../../services/logger/Logger";

export class DynamoBookingRepository implements BookingRepository {
  constructor(private logger: Logger) {}

  create(booking: Booking): void {
    this.logger.debug("dynamodb booking create", booking);
  }
}
