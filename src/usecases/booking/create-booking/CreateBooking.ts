import { Logger } from "../../../services/logger/Logger";
import { BookingPersistence } from "../../../services/persistence/booking/BookingPersistence";

export class CreateBooking {
  constructor(
    private logger: Logger,
    private persistence: BookingPersistence
  ) {}

  execute() {
    const booking = {
      id: "123",
    };

    this.logger.debug("booking before create", booking);
    this.persistence.create(booking);
  }
}
