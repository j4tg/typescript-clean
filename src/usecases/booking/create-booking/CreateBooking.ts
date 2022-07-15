import { Logger } from "../../../services/logger/Logger";
import { BookingRepository } from "../../../repositories/booking/BookingRepository";
import { FeatureFlag } from "../../../services/feature-flag/FeatureFlag";

export class CreateBooking {
  constructor(
    private logger: Logger,
    private bookingRepository: BookingRepository,
    private featureFlag: FeatureFlag
  ) {}

  execute() {
    const booking = {
      id: "123",
    };

    this.logger.debug("booking create", booking);
    this.bookingRepository.create(booking);

    if (this.featureFlag.isEnabled("JIRA_1000")) {
      this.logger.debug("add event bus message");
    }
  }
}
