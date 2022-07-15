import { container } from "./src/container";
import { CreateBooking } from "./src/usecases/booking/create-booking/CreateBooking";

const createBooking = container.resolve<CreateBooking>("createBooking");
createBooking.execute();
