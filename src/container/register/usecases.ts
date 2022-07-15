import { asClass } from "awilix";
import { container } from "../instance";
import { CreateBooking } from "../../usecases/booking/create-booking/CreateBooking";

container.register({
  createBooking: asClass(CreateBooking),
});
