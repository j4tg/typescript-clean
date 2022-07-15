import { asClass } from "awilix";
import { container } from "../instance";
import { BookingPersistence } from "../../services/persistence/booking/BookingPersistence";
import { DynamoBookingPersistence } from "../../services/persistence/booking/dynamo/DynamoBookingPersistence";

container.register({
  bookingPersistence: asClass<BookingPersistence>(DynamoBookingPersistence),
});
