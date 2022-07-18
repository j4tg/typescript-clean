import { asClass } from "awilix";
import { container } from "../instance";
import { CreateBooking } from "../../usecase/booking/create-booking/CreateBooking";

container.register({
  createBooking: asClass(CreateBooking),
});
