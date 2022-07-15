import { Logger } from "../../../services/logger/Logger";
import { BookingPersistence } from "../../../services/persistence/booking/BookingPersistence";
import { FeatureFlag } from "../../../services/feature-flag/FeatureFlag";

export class CreateBooking {
  constructor(
    private logger: Logger,
    private persistence: BookingPersistence,
    private featureFlag: FeatureFlag
  ) {}

  execute() {
    const booking = {
      id: "123",
    };

    this.logger.debug("booking before create", booking);
    this.persistence.create(booking);

    if (this.featureFlag.isEnabled("JIRA_1000")) {
      this.logger.debug("JIRA_1000 is enabled");
    }
  }
}
