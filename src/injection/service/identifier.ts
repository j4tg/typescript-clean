import { container } from "tsyringe";
import { Identifier } from "@/service/identifier/Identifier";
import { TimestampIdentifier } from "@/service/identifier/timestamp/TimestampIdentifier";

container.register<Identifier>("Identifier", TimestampIdentifier);
