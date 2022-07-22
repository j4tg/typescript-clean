import { container } from "tsyringe";
import { BookingRepository } from "@/repository/booking/BookingRepository";
import { DynamoBookingRepository } from "@/repository/booking/dynamo/DynamoBookingRepository";

container.register<BookingRepository>(
  "BookingRepository",
  DynamoBookingRepository
);
