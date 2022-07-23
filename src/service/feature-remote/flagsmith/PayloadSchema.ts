import { z } from "zod";

export const PayloadSchema = z.object({
  data: z.object({
    new_state: z
      .object({
        enabled: z.boolean(),
        feature: z.object({
          name: z.string(),
        }),
      })
      .nullable(),
    previous_state: z
      .object({
        enabled: z.boolean(),
        feature: z.object({
          name: z.string(),
        }),
      })
      .nullable(),
  }),
  event_type: z.enum(["FLAG_DELETED", "FLAG_UPDATED"]),
});
