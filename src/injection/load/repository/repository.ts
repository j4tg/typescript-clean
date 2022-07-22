import { asClass } from "awilix";
import { container } from "../../instance";
import { BookingRepository } from "../../../repository/booking/BookingRepository";
import { DynamoBookingRepository } from "../../../repository/booking/dynamo/DynamoBookingRepository";

container.register({
  bookingRepository: asClass<BookingRepository>(DynamoBookingRepository),
});
