import { asClass } from "awilix";
import { container } from "../instance";
import { BookingRepository } from "../../repositories/booking/BookingRepository";
import { DynamoBookingRepository } from "../../repositories/booking/dynamo/DynamoBookingRepository";

container.register({
  bookingRepository: asClass<BookingRepository>(DynamoBookingRepository),
});
