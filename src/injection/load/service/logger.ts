import { container } from "tsyringe";
import { Logger } from "@/service/logger/Logger";
import { PrettyLogger } from "@/service/logger/pretty/PrettyLogger";

container.register<Logger>("Logger", PrettyLogger);
