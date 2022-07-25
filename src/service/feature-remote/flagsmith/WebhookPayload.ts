import { z } from 'zod'

export const WebhookPayload = z.object({
  data: z.object({
    new_state: z
      .object({
        enabled: z.boolean(),
        feature: z.object({
          name: z.string()
        })
      })
      .optional(),
    previous_state: z
      .object({
        feature: z.object({
          name: z.string()
        })
      })
      .optional()
  }),
  event_type: z.enum(['FLAG_DELETED', 'FLAG_UPDATED'])
})
