import { CreateBooking } from "./src/usecases/booking/create-booking/CreateBooking";
import { DynamoBookingPersistence } from "./src/services/persistence/booking/dynamo/DynamoBookingPersistence";
import { EnvironmentFeatureFlag } from "./src/services/feature-flag/environment/EnvironmentFeatureFlag";

import { PrettyLogger } from "./src/services/logger/pretty/PrettyLogger";
import { JsonLogger } from "./src/services/logger/json/JsonLogger";

const logger = new PrettyLogger();
const bookingPersistence = new DynamoBookingPersistence();
const environmentFeatureFlag = new EnvironmentFeatureFlag();

// example of call usecase
const createBooking = new CreateBooking(
  logger,
  bookingPersistence,
  environmentFeatureFlag
);
createBooking.execute();
