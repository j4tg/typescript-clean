import { asClass } from "awilix";
import { container } from "../instance";
import { Logger } from "../../services/logger/Logger";
import { PrettyLogger } from "../../services/logger/pretty/PrettyLogger";

container.register({
  logger: asClass<Logger>(PrettyLogger),
});
