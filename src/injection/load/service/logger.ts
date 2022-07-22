import { asClass } from "awilix";
import { container } from "../../instance";
import { Logger } from "@/service/logger/Logger";
import { PrettyLogger } from "@/service/logger/pretty/PrettyLogger";

container.register({
  logger: asClass<Logger>(PrettyLogger),
});
