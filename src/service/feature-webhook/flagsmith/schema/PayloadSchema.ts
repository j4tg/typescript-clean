import { z } from "zod";

export const PayloadSchema = z.object({
  data: z.object({
    new_state: z.object({
      enabled: z.boolean(),
      feature: z.object({
        name: z.string(),
      }),
    }),
  }),
});
